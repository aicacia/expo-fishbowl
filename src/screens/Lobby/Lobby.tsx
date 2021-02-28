import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, CheckBox, Divider, Input, Text } from "@ui-kitten/components";
import { GAME_SCREEN, ParamList } from "../../navigationConfig";
import { usePeer } from "../../peer";
import { useMapStateToProps } from "../../state";
import {
  gameSetPeerName,
  gameSetPeerTeam,
  gameSetTeamName,
  Peer,
  selectPeers,
  selectTeams,
  setPeerTeam,
} from "../../state/game";
import { getAppId, getIdFromAppId } from "../../id";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  castButton: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 32,
    height: 32,
  },
});

export function Lobby(props: ParamList[typeof GAME_SCREEN]) {
  const peer = usePeer(),
    peers = useMapStateToProps(selectPeers),
    teams = useMapStateToProps(selectTeams),
    myPeer = peers.get(peer ? peer.getId() : "", Peer()),
    [name, setName] = useState(myPeer.name),
    [teamNames, setTeamNames] = useState(teams),
    navigation = useNavigation(),
    team1 = peers.filter((peer) => peer.team === 0).toList(),
    team2 = peers.filter((peer) => peer.team === 1).toList();

  useMemo(() => setTeamNames(teams), [teams]);

  useMemo(async () => {
    const appPeerId = getAppId(props.id);

    if (peer) {
      if (appPeerId !== peer.getId()) {
        try {
          await peer.connect(appPeerId);
        } catch (_) {}

        const onStart = (message: any) => {
          if (message.type === "start") {
            navigation.navigate(GAME_SCREEN, { id: props.id });
            peer.off("message", onStart);
          }
        };
        peer.on("message", onStart);
      }
      gameSetPeerName(peer.getId(), getIdFromAppId(peer.getId()));
    }
  }, [peer, props.id]);

  const createOnSetTeamName = useCallback(
    (team: number) => (name: string) => {
      if (peer) {
        gameSetTeamName(team, name);
        setTeamNames((teamNames) => teamNames.set(team, name));
      }
    },
    [peer]
  );

  const onSetName = useCallback(
    (name: string) => {
      if (peer) {
        gameSetPeerName(peer.getId(), name);
        setName(name);
      }
    },
    [peer]
  );

  const createOnSetTeam = useCallback(
    (team: number) => () => {
      if (peer) {
        gameSetPeerTeam(peer.getId(), team);
      }
    },
    [peer]
  );

  const onStart = useCallback(() => {
    if (peer) {
      peer.broadcast({
        type: "start",
      });
      navigation.navigate(GAME_SCREEN, { id: props.id });
    }
  }, [peer, props.id]);

  return (
    <View>
      <Input label="Your Name" value={name} onChangeText={onSetName} />
      <Input
        label="Team 1 Name"
        value={teamNames.get(0, "")}
        onChangeText={createOnSetTeamName(0)}
      />
      <Input
        label="Team 2 Name"
        value={teamNames.get(1, "")}
        onChangeText={createOnSetTeamName(1)}
      />
      <Divider />
      <CheckBox checked={myPeer.team == 0} onChange={createOnSetTeam(0)}>
        {(myPeer.team == 1 ? "Join " : "") + teamNames.get(0, "")}
      </CheckBox>
      {team1
        .toSeq()
        .map((peer, id) => <Text key={id}>{peer.name}</Text>)
        .valueSeq()}
      <CheckBox checked={myPeer.team == 1} onChange={createOnSetTeam(1)}>
        {(myPeer.team == 0 ? "Join " : "") + teamNames.get(1, "")}
      </CheckBox>
      {team2
        .toSeq()
        .map((peer, id) => <Text key={id}>{peer.name}</Text>)
        .valueSeq()}
      <Button disabled={team1.isEmpty() || team2.isEmpty()} onPress={onStart}>
        Start
      </Button>
    </View>
  );
}
