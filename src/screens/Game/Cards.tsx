import { Button, Input } from "@ui-kitten/components";
import React, { memo, useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { usePeerId } from "../../peer";
import { useMapStateToProps } from "../../state";
import {
  selectDoneWithCards,
  selectPeerCards,
  setCardText,
  setDoneWithCards,
} from "../../state/game";

export const Cards = memo(() => {
  const peerId = usePeerId(),
    doneWithCards = useMapStateToProps((state) =>
      selectDoneWithCards(state, peerId || "")
    ),
    cards = useMapStateToProps((state) => selectPeerCards(state, peerId || "")),
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

  const onAddCard = useCallback(
    () => setCardTexts((cardTexts) => cardTexts.push("")),
    []
  );

  const onDoneWithCards = useCallback(
    () => peerId && setDoneWithCards(peerId, true),
    [peerId]
  );

  return (
    <View>
      {cardTexts.valueSeq().map((text, index) => (
        <Input
          key={index}
          label={`Card ${index + 1}`}
          value={text}
          onChangeText={createOnSetCardTexts(index)}
        />
      ))}
      <Button onPress={onAddCard}>Add</Button>
      <Button
        disabled={doneWithCards || cards.size < 3}
        onPress={onDoneWithCards}
      >
        Ready
      </Button>
    </View>
  );
});
