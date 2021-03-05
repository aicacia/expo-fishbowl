import { Map, RecordOf, OrderedSet } from "immutable";
import { XorShiftRng } from "@aicacia/rand";
import { IGame, IPeer, ICard, Peer, Card, fromJSON, Game } from "./definitions";
import {
  GAME_DELETE_CARD,
  GAME_SET_CARD_TEXT,
  GAME_SET_DONE_WITH_CARDS,
  GAME_SET_NAME,
  GAME_SET_STATE,
  GAME_SET_TEAM,
  GAME_SET_TEAM_NAME,
  GAME_INIT_ROUND,
  GAME_SYNC,
  GAME_TRUST,
  IGameAction,
} from "./actions";

function updatePeer(
  state: RecordOf<IGame>,
  id: string,
  updater: (peer: RecordOf<IPeer>) => RecordOf<IPeer>
) {
  return state.update("peers", (peers) =>
    peers.set(id, updater(peers.get(id) || Peer()))
  );
}

function updateCard(
  state: RecordOf<IGame>,
  peerId: string,
  index: number,
  updater: (peer: RecordOf<ICard>) => RecordOf<ICard>
) {
  return state.update("cards", (cards) => {
    const peerCards = cards.get(peerId, Map<number, RecordOf<ICard>>()),
      peerCard = peerCards.get(index, Card());

    return cards.set(peerId, peerCards.set(index, updater(peerCard)));
  });
}

function deleteCard(state: RecordOf<IGame>, peerId: string, index: number) {
  return state.update("cards", (cards) => {
    const peerCards = cards.get(peerId, Map<number, RecordOf<ICard>>());
    return cards.set(peerId, peerCards.delete(index));
  });
}

// export const INITIAL_STATE = fromJSON({
//   state: GameState.Playing,
//   peers: {
//     "fishbowl-aicacia-com-UKLIZG3": {
//       name: "UKLIZG3",
//       team: 0,
//       doneWithCards: true,
//     },
//     "fishbowl-aicacia-com-ETJF82J": {
//       name: "ETJF82J",
//       team: 1,
//       doneWithCards: true,
//     },
//   },
//   teams: {
//     "0": "Team 1",
//     "1": "Team 2",
//   },
//   cards: {
//     "fishbowl-aicacia-com-UKLIZG3": {
//       "0": {
//         text: "Billy",
//       },
//       "1": {
//         text: "Balls",
//       },
//     },
//     "fishbowl-aicacia-com-ETJF82J": {
//       "0": {
//         text: "Bob",
//       },
//       "1": {
//         text: "James Gun",
//       },
//     },
//   },
//   cardList: [
//     {
//       text: "Billy",
//     },
//     {
//       text: "Balls",
//     },
//     {
//       text: "Bob",
//     },
//     {
//       text: "James Gun",
//     },
//   ],
//   peerList: ["fishbowl-aicacia-com-ETJF82J", "fishbowl-aicacia-com-UKLIZG3"],
//   score: {
//     "0": 0,
//     "1": 0,
//   },
// });
export const INITIAL_STATE = Game();

export function reducer(
  state = INITIAL_STATE,
  action: IGameAction
): RecordOf<IGame> {
  switch (action.type) {
    case GAME_SET_NAME:
      return updatePeer(state, action.peerId, (peer) =>
        peer.set("name", action.name)
      );
    case GAME_SET_TEAM:
      return updatePeer(state, action.peerId, (peer) =>
        peer.set("team", action.team)
      );
    case GAME_SET_TEAM_NAME:
      return state.update("teams", (teams) =>
        teams.set(action.team, action.name)
      );
    case GAME_SYNC:
      const syncState = fromJSON(action.state);

      if (syncState.trust > state.trust) {
        return state.mergeDeep(syncState);
      } else {
        return syncState.mergeDeep(state);
      }
    case GAME_SET_STATE:
      return state.set("state", action.state);
    case GAME_INIT_ROUND:
      const rng = XorShiftRng.fromSeed(action.seed);
      return state
        .set(
          "cardList",
          OrderedSet(
            rng.shuffle(
              state.cards
                .map((peerCards) => peerCards.valueSeq().toArray())
                .valueSeq()
                .toArray()
                .flat()
            )
          )
        )
        .set(
          "peerList",
          OrderedSet(rng.shuffle(state.peers.keySeq().toArray()))
        );
    case GAME_SET_CARD_TEXT:
      return updateCard(state, action.peerId, action.index, (card) =>
        card.set("text", action.text)
      );
    case GAME_SET_DONE_WITH_CARDS:
      return updatePeer(state, action.peerId, (peer) =>
        peer.set("doneWithCards", action.doneWithCards)
      );
    case GAME_DELETE_CARD:
      return deleteCard(state, action.peerId, action.index);
    case GAME_TRUST:
      return state.update("trust", (trust) => trust + 1);
    default:
      return state;
  }
}
