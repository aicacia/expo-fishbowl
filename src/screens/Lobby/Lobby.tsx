import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { makeUrl } from "expo-linking";
import { Button, CheckBox, Divider, Input, Text } from "@ui-kitten/components";
import { GAME_SCREEN, ParamList } from "../../navigationConfig";
import { usePeer } from "../../peer";
import { useMapStateToProps } from "../../state";
import {
  setPeerName,
  setPeerTeam,
  setTeamName,
  start,
  Peer,
  selectPeers,
  selectTeams,
  selectState,
  GameState,
  lobby,
} from "../../state/game";
import { getAppId } from "../../id";
import { useNavigation } from "@react-navigation/native";
import { QRCode } from "../../QRCode";
import { isLargeScreen, SMALL_WIDTH } from "../../constants";

const styles = StyleSheet.create({
  qrcode: {
    flex: 1,
    alignItems: "center",
  },
});

export function Lobby(props: ParamList[typeof GAME_SCREEN]) {
  const peer = usePeer(),
    state = useMapStateToProps(selectState),
    peers = useMapStateToProps(selectPeers),
    teams = useMapStateToProps(selectTeams),
    windowDimensions = useWindowDimensions(),
    peerState = peers.get(peer ? peer.getId() : "", Peer()),
    [name, setName] = useState(peerState.name),
    [teamNames, setTeamNames] = useState(teams),
    navigation = useNavigation(),
    team1 = peers.filter((peer) => peer.team === 0).toList(),
    team2 = peers.filter((peer) => peer.team === 1).toList();

  if (state === GameState.None) {
    lobby();
  } else if (state !== GameState.Lobby) {
    navigation.navigate(GAME_SCREEN, { id: props.id });
  }

  useMemo(() => setTeamNames(teams), [teams]);

  useMemo(async () => {
    const appPeerId = getAppId(props.id);

    if (peer) {
      if (appPeerId !== peer.getId()) {
        try {
          await peer.connect(appPeerId);
        } catch (_) {}
      }
    }
  }, [peer, props.id]);

  const createOnSetTeamName = useCallback(
    (team: number) => (name: string) => {
      if (peer) {
        setTeamName(team, name);
        setTeamNames((teamNames) => teamNames.set(team, name));
      }
    },
    [peer]
  );

  const onSetName = useCallback(
    (name: string) => {
      if (peer) {
        setPeerName(peer.getId(), name);
        setName(name);
      }
    },
    [peer]
  );

  const createOnSetTeam = useCallback(
    (team: number) => () => {
      if (peer) {
        setPeerTeam(peer.getId(), team);
      }
    },
    [peer]
  );

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
      <CheckBox checked={peerState.team == 0} onChange={createOnSetTeam(0)}>
        {(peerState.team == 1 ? "Join " : "") + teamNames.get(0, "")}
      </CheckBox>
      {team1
        .toSeq()
        .map((peer, id) => <Text key={id}>{peer.name}</Text>)
        .valueSeq()}
      <CheckBox checked={peerState.team == 1} onChange={createOnSetTeam(1)}>
        {(peerState.team == 0 ? "Join " : "") + teamNames.get(1, "")}
      </CheckBox>
      {team2
        .toSeq()
        .map((peer, id) => <Text key={id}>{peer.name}</Text>)
        .valueSeq()}
      <Button disabled={team1.isEmpty() || team2.isEmpty()} onPress={start}>
        Start
      </Button>
      <View style={styles.qrcode}>
        <QRCode
          uri={makeUrl(`/lobby/${props.id}`)}
          size={
            isLargeScreen(windowDimensions.width)
              ? SMALL_WIDTH
              : windowDimensions.width
          }
        />
      </View>
    </View>
  );
}
