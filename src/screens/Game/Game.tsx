import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { GAME_SCREEN, ParamList } from "../../navigationConfig";
import CastButton from "../../CastButton";
import { selectPeers, selectTeams } from "../../state/game";
import { useMapStateToProps } from "../../state";
import { usePeer } from "../../peer";

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
    peers = useMapStateToProps(selectPeers),
    teams = useMapStateToProps(selectTeams);

  console.log(peer, peers, teams);

  return (
    <View>
      <Text>Hello, world {props.id}!</Text>
      <CastButton style={styles.castButton} />
    </View>
  );
}
