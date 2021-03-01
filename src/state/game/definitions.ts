import { IJSONObject } from "@aicacia/json";
import { createActionWithPayload, IAction } from "@aicacia/state";
import { Map, Record, RecordOf } from "immutable";

export interface IPeer {
  name: string;
  team: number;
  doneWithCards: boolean;
}

export const Peer = Record<IPeer>({
  name: "",
  team: 0,
  doneWithCards: false,
});

export function peerFromJSON(json: IJSONObject): RecordOf<IPeer> {
  return Peer({
    name: json.name as string,
    team: json.team as number,
  });
}

export function peersFromJSON(json: IJSONObject) {
  return Object.keys(json).reduce(
    (peers, id) => peers.set(id, peerFromJSON(json[id] as IJSONObject)),
    Map<string, RecordOf<IPeer>>()
  );
}

export interface ICard {
  text: string;
}

export const Card = Record<ICard>({
  text: "",
});

export function cardFromJSON(json: IJSONObject): RecordOf<ICard> {
  return Card({
    text: json.text as string,
  });
}

export function cardsFromJSON(json: IJSONObject) {
  return Object.keys(json).reduce((peersCards, id) => {
    const peerCardsJSON = json[id] as IJSONObject;
    return peersCards.set(
      id,
      Object.keys(peerCardsJSON).reduce(
        (cards, idx) =>
          cards.set(+idx, cardFromJSON(peerCardsJSON[idx] as IJSONObject)),
        Map<number, RecordOf<ICard>>()
      )
    );
  }, Map<string, Map<number, RecordOf<ICard>>>());
}

export function teamsFromJSON(json: IJSONObject) {
  return Object.keys(json).reduce(
    (teams, team) => teams.set(+team, json[team] as string),
    Map<number, string>()
  );
}

export enum GameState {
  Lobby,
  Cards,
  Playing,
  Done,
}

export interface IGame {
  state: GameState;
  peers: Map<string, RecordOf<IPeer>>;
  teams: Map<number, string>;
  cards: Map<string, Map<number, RecordOf<ICard>>>;
}

export const Game = Record<IGame>({
  state: GameState.Cards,
  peers: Map(),
  teams: teamsFromJSON({ 0: "Team 1", 1: "Team 2" }),
  cards: Map(),
});

export function fromJSON(json: IJSONObject): RecordOf<IGame> {
  return Game({
    state: json.state as GameState,
    peers: peersFromJSON(json.peers as IJSONObject),
    teams: teamsFromJSON(json.teams as IJSONObject),
    cards: cardsFromJSON(json.cards as IJSONObject),
  });
}

export const STORE_NAME = "game";
export const INITIAL_STATE = Game();

export const syncAction = createActionWithPayload<{
  from: string;
  state: IJSONObject;
}>(`${STORE_NAME}.sync`);

export const setStateAction = createActionWithPayload<GameState>(
  `${STORE_NAME}.set-state`
);

export const setNameAction = createActionWithPayload<{
  id: string;
  name: string;
}>(`${STORE_NAME}.set-name`);

export const setTeamAction = createActionWithPayload<{
  id: string;
  team: number;
}>(`${STORE_NAME}.set-team`);

export const setTeamNameAction = createActionWithPayload<{
  team: number;
  name: string;
}>(`${STORE_NAME}.set-team-name`);

export const setCardTextAction = createActionWithPayload<{
  peerId: string;
  index: number;
  text: string;
}>(`${STORE_NAME}.set-card-text`);

export const setDoneWithCardsAction = createActionWithPayload<{
  peerId: string;
  doneWithCards: boolean;
}>(`${STORE_NAME}.set-done-with-cards`);

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

export function reducer(
  state: RecordOf<IGame>,
  action: IAction
): RecordOf<IGame> {
  if (setNameAction.is(action)) {
    return updatePeer(state, action.payload.id, (peer) =>
      peer.set("name", action.payload.name)
    );
  } else if (setTeamAction.is(action)) {
    return updatePeer(state, action.payload.id, (peer) =>
      peer.set("team", action.payload.team)
    );
  } else if (setTeamNameAction.is(action)) {
    return state.update("teams", (teams) =>
      teams.set(action.payload.team, action.payload.name)
    );
  } else if (syncAction.is(action)) {
    const syncState = fromJSON(action.payload.state);

    if (syncState.peers.size > state.peers.size) {
      return state.mergeDeep(syncState);
    } else {
      return syncState.mergeDeep(state);
    }
  } else if (setStateAction.is(action)) {
    return state.set("state", action.payload);
  } else if (setCardTextAction.is(action)) {
    return updateCard(
      state,
      action.payload.peerId,
      action.payload.index,
      (card) => card.set("text", action.payload.text)
    );
  } else if (setDoneWithCardsAction.is(action)) {
    return updatePeer(state, action.payload.peerId, (peer) =>
      peer.set("doneWithCards", action.payload.doneWithCards)
    );
  } else {
    return state;
  }
}
