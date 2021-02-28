import { IJSONObject } from "@aicacia/json";
import { createActionWithPayload } from "@aicacia/state";
import { Map, List, Record, RecordOf } from "immutable";

export interface IPeer {
  name: string;
  team: number;
}

export const Peer = Record<IPeer>({
  name: "",
  team: 0,
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
  return Object.keys(json).reduce(
    (cards, id) =>
      cards.set(id, List((json[id] as Array<IJSONObject>).map(cardFromJSON))),
    Map<string, List<RecordOf<ICard>>>()
  );
}

export interface IGame {
  peers: Map<string, RecordOf<IPeer>>;
  teams: List<string>;
  cards: Map<string, List<RecordOf<ICard>>>;
}

export const Game = Record<IGame>({
  peers: Map(),
  teams: List(["Team 1", "Team 2"]),
  cards: Map(),
});

export function fromJSON(json: IJSONObject): RecordOf<IGame> {
  return Game({
    peers: peersFromJSON(json.peers as IJSONObject),
    teams: List(json.teams as Array<string>),
    cards: cardsFromJSON(json.cards as IJSONObject),
  });
}

export const STORE_NAME = "game";
export const INITIAL_STATE = Game();

export const gameSyncAction = createActionWithPayload<{
  peers: {
    [key: string]: IPeer;
  };
  cards: {
    [key: string]: Array<ICard>;
  };
}>(`${STORE_NAME}.sync`);
export const gameSetNameAction = createActionWithPayload<{
  id: string;
  name: string;
}>(`${STORE_NAME}.set-name`);
export const gameSetTeamAction = createActionWithPayload<{
  id: string;
  team: number;
}>(`${STORE_NAME}.set-team`);
export const gameSetTeamNameAction = createActionWithPayload<{
  team: number;
  name: string;
}>(`${STORE_NAME}.set-team-name`);
