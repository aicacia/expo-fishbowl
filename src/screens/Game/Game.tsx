import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { GAME_SCREEN, ParamList } from "../../navigationConfig";
import CastButton from "../../CastButton";
import {
  GameState,
  selectPeers,
  selectState,
  selectTeams,
  start,
} from "../../state/game";
import { useMapStateToProps } from "../../state";
import { usePeer } from "../../peer";
import { getAppId } from "../../id";

const styles = StyleSheet.create({
  castButton: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 32,
    height: 32,
  },
});

export function Game(props: ParamList[typeof GAME_SCREEN]) {
  const peer = usePeer(),
    state = useMapStateToProps(selectState),
    peers = useMapStateToProps(selectPeers),
    teams = useMapStateToProps(selectTeams);

  if (state !== GameState.Started) {
    start();
  }

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

  return (
    <View>
      <Text>{`My Id ${peer?.getId()}`}</Text>
      <Text>{`Peers ${JSON.stringify(peers, null, 2)}`}</Text>
      <Text>{`Teams ${JSON.stringify(teams, null, 2)}`}</Text>
      <CastButton style={styles.castButton} />
    </View>
  );
}
