import { Button, Input } from "@ui-kitten/components";
import React, { memo, useCallback, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { usePeerId } from "../../peer";
import { useReduxStore } from "../../state";
import { GameState } from "../../state/game/definitions";
import {
  setCardText,
  setDoneWithCards,
  deleteCard,
  setGameState,
  initRound,
} from "../../state/game/functions";
import {
  selectDoneWithCards,
  selectEveryoneDoneWithCards,
  selectPeerCards,
} from "../../state/game/selectors";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },
  cardInput: {
    flex: 11,
  },
  cardButton: {
    flex: 1,
    margin: 16,
    justifyContent: "center",
  },
});

export const Cards = memo(() => {
  const peerId = usePeerId(),
    everyoneDoneWithCards = useReduxStore(selectEveryoneDoneWithCards),
    doneWithCards = useReduxStore((state) =>
      selectDoneWithCards(state, peerId || "")
    ),
    cards = useReduxStore((state) => selectPeerCards(state, peerId || "")),
    [cardTexts, setCardTexts] = useState(() =>
      cards.map((card) => card.text).toList()
    );

  useMemo(
    () =>
      setCardTexts((cardTexts) =>
        cards.reduce(
          (cardTexts, card, index) => cardTexts.set(index, card.text),
          cardTexts
        )
      ),
    [cards]
  );

  const createOnSetCardTexts = (index: number) => (text: string) => {
    if (peerId) {
      setCardText(peerId, index, text);
    }
    setCardTexts((cardTexts) => cardTexts.set(index, text));
  };

  const createOnDeleteCard = (index: number) => () => {
    if (peerId) {
      deleteCard(peerId, index);
    }
    setCardTexts((cardTexts) => cardTexts.delete(index));
  };

  const onAddCard = useCallback(
    () => setCardTexts((cardTexts) => cardTexts.push("")),
    []
  );

  const onDoneWithCards = useCallback(
    () => peerId && setDoneWithCards(peerId, true),
    [peerId]
  );

  const onStart = useCallback(() => {
    if (peerId) {
      initRound(Date.now());
      setGameState(GameState.Playing);
    }
  }, [peerId]);

  return (
    <View>
      {cardTexts.valueSeq().map((text, index) => (
        <View key={index} style={styles.card}>
          <Input
            style={styles.cardInput}
            label={`Card ${index + 1}`}
            value={text}
            onChangeText={createOnSetCardTexts(index)}
          />
          <View style={styles.cardButton}>
            <Button status="danger" onPress={createOnDeleteCard(index)}>
              Delete
            </Button>
          </View>
        </View>
      ))}
      <Button onPress={onAddCard}>Add Card</Button>
      {!doneWithCards && !cards.isEmpty() && (
        <Button onPress={onDoneWithCards}>Ready</Button>
      )}
      {everyoneDoneWithCards && <Button onPress={onStart}>Start</Button>}
    </View>
  );
});
