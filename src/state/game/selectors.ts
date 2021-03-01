import { Map, List, RecordOf } from "immutable";
import { IState } from "../lib/state";
import { IPeer, Peer, GameState, STORE_NAME, ICard } from "./definitions";

export function selectState(state: IState): GameState {
  return state[STORE_NAME].state;
}

export function selectPeers(state: IState): Map<string, RecordOf<IPeer>> {
  return state[STORE_NAME].peers;
}

export function selectPeer(state: IState, id: string): RecordOf<IPeer> {
  return state[STORE_NAME].peers.get(id, Peer());
}

export function selectTeams(state: IState): Map<number, string> {
  return state[STORE_NAME].teams;
}

export function selectPeerCards(
  state: IState,
  id: string
): Map<number, RecordOf<ICard>> {
  return state[STORE_NAME].cards.get(id, Map());
}

export function selectCards(state: IState): List<RecordOf<ICard>> {
  return state[STORE_NAME].cards.reduce(
    (cards, peerCards) => cards.merge(peerCards.toList()),
    List()
  );
}

export function selectDoneWithCards(state: IState, peerId: string): boolean {
  return state[STORE_NAME].peers.get(peerId, Peer()).doneWithCards;
}

export function selectEveryoneDoneWithCards(state: IState): boolean {
  const peers = state[STORE_NAME].peers.valueSeq().toArray();

  if (!peers.length) {
    return false;
  }

  for (const peer of peers) {
    if (!peer.doneWithCards) {
      return false;
    }
  }
  return true;
}
