import React, { memo, useCallback, useMemo, useState } from "react";
import { Button, CheckBox, Divider, Input, Text } from "@ui-kitten/components";
import { usePeer } from "../../peer";
import { useReduxStore } from "../../state";
import { Peer, GameState } from "../../state/game/definitions";
import {
  setPeerName,
  setPeerTeam,
  setTeamName,
  setGameState,
} from "../../state/game/functions";
import { selectPeers, selectTeams } from "../../state/game/selectors";

export const Lobby = memo(() => {
  const peer = usePeer(),
    peers = useReduxStore(selectPeers),
    teams = useReduxStore(selectTeams),
    peerState = peers.get(peer ? peer.getId() : "", Peer()),
    [name, setName] = useState(peerState.name),
    [teamNames, setTeamNames] = useState(teams),
    team1 = peers.filter((peer) => peer.team === 0).toList(),
    team2 = peers.filter((peer) => peer.team === 1).toList();

  useMemo(() => setTeamNames(teams), [teams]);

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

  const onStart = useCallback(() => setGameState(GameState.Cards), []);

  return (
    <>
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
      <Button disabled={team1.isEmpty() || team2.isEmpty()} onPress={onStart}>
        Start
      </Button>
    </>
  );
});
