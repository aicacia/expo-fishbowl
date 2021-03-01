import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { GAME_SCREEN, HOME_SCREEN, ParamList } from "../../navigationConfig";
import { usePeer } from "../../peer";
import { useNavigation } from "@react-navigation/native";
import { getIdFromAppId } from "../../id";

const styles = StyleSheet.create({
  startNewGame: {
    marginTop: 32,
  },
});

export function Home(_props: ParamList[typeof HOME_SCREEN]) {
  const [gameId, setGameId] = useState(""),
    peer = usePeer(),
    navigation = useNavigation();

  return (
    <View>
      <Input value={gameId} onChangeText={setGameId} />
      <Button
        disabled={!gameId.length}
        onPress={() => navigation.navigate(GAME_SCREEN, { id: gameId })}
      >
        Join Game
      </Button>
      {peer && (
        <Button
          style={styles.startNewGame}
          onPress={() =>
            navigation.navigate(GAME_SCREEN, {
              id: getIdFromAppId(peer.getId()),
            })
          }
        >
          Start New Game
        </Button>
      )}
    </View>
  );
}
