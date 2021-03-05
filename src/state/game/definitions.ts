import { IJSONObject } from "@aicacia/json";
import { OrderedSet, Map, Record, RecordOf } from "immutable";

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

export function scoreFromJSON(json: IJSONObject) {
  return Object.keys(json).reduce(
    (score, team) => score.set(+team, json[team] as number),
    Map<number, number>()
  );
}

export enum GameState {
  Lobby,
  Cards,
  Playing,
  Done,
}

export interface IGame {
  trust: number;
  state: GameState;
  peers: Map<string, RecordOf<IPeer>>;
  teams: Map<number, string>;
  cards: Map<string, Map<number, RecordOf<ICard>>>;
  cardList: OrderedSet<RecordOf<ICard>>;
  peerList: OrderedSet<string>;
  score: Map<number, number>;
}

export const Game = Record<IGame>({
  trust: 0,
  state: GameState.Lobby,
  peers: Map(),
  teams: teamsFromJSON({ 0: "Team 1", 1: "Team 2" }),
  cards: Map(),
  cardList: OrderedSet(),
  peerList: OrderedSet(),
  score: scoreFromJSON({ 0: 0, 1: 0 }),
});

export function fromJSON(json: IJSONObject): RecordOf<IGame> {
  return Game({
    trust: json.trust as number,
    state: json.state as GameState,
    peers: peersFromJSON(json.peers as IJSONObject),
    teams: teamsFromJSON(json.teams as IJSONObject),
    cards: cardsFromJSON(json.cards as IJSONObject),
    cardList: OrderedSet(
      (json.cardList as Array<IJSONObject>).map(cardFromJSON)
    ),
    peerList: OrderedSet(json.peerList as Array<string>),
    score: scoreFromJSON(json.cards as IJSONObject),
  });
}
