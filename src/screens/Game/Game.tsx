import React, { useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { makeUrl } from "expo-linking";
import { GAME_SCREEN, ParamList } from "../../navigationConfig";
import { usePeer } from "../../peer";
import { useMapStateToProps } from "../../state";
import {
  GameState,
  selectEveryoneDoneWithCards,
  selectState,
  setGameState,
} from "../../state/game";
import { Cards } from "./Cards";
import CastButton from "../../CastButton";
import { getAppId } from "../../id";
import { Lobby } from "./Lobby";
import { Playing } from "./Playing";
import { QRCode } from "../../QRCode";
import { isLargeScreen, SMALL_WIDTH } from "../../constants";

const styles = StyleSheet.create({
  qrcode: {
    flex: 1,
    alignItems: "center",
  },
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
    everyoneDoneWithCards = useMapStateToProps(selectEveryoneDoneWithCards),
    gameState = useMapStateToProps(selectState),
    windowDimensions = useWindowDimensions();

  useMemo(() => {
    const appPeerId = getAppId(props.id);

    if (peer) {
      if (appPeerId !== peer.getId()) {
        try {
          peer.connect(appPeerId);
        } catch (_) {}
      }
    }
  }, [peer, props.id]);

  if (everyoneDoneWithCards && gameState !== GameState.Playing) {
    setGameState(GameState.Playing);
  }

  return (
    <>
      {gameState === GameState.Lobby ? (
        <Lobby />
      ) : gameState === GameState.Cards ? (
        <Cards />
      ) : gameState === GameState.Playing ? (
        <Playing />
      ) : null}
      <View style={styles.qrcode}>
        <QRCode
          uri={makeUrl(`/game/${props.id}`)}
          size={
            isLargeScreen(windowDimensions.width)
              ? SMALL_WIDTH
              : windowDimensions.width
          }
        />
      </View>
      <CastButton style={styles.castButton} />
    </>
  );
}
