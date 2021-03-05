import React, { memo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useReduxStore } from "../../state";
import {
  selectCurrentCard,
  selectCurrentPeer,
} from "../../state/game/selectors";
import { usePeerId } from "../../peer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export const Playing = memo(() => {
  const peerId = usePeerId(),
    card = useReduxStore(selectCurrentCard),
    currentPeer = useReduxStore(selectCurrentPeer),
    myTurn = peerId === currentPeer;

  const onCorrect = useCallback(() => null, []);
  const onNext = useCallback(() => null, []);

  return (
    <View style={styles.container}>
      {myTurn && (
        <>
          <Text category="h3">Your Turn</Text>
          {card.isSome() && <Text category="h1">{card.unwrap().text}</Text>}
          <Button status="success" onPress={onCorrect}>
            Correct
          </Button>
          <Button status="danger" onPress={onNext}>
            Next
          </Button>
        </>
      )}
    </View>
  );
});
