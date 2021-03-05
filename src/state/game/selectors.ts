import { IState } from "..";
import { Map, List, RecordOf } from "immutable";
import { IPeer, Peer, GameState, ICard } from "./definitions";
import { Option } from "@aicacia/core";

export function selectState(state: IState): GameState {
  return state.game.state;
}

export function selectPeers(state: IState): Map<string, RecordOf<IPeer>> {
  return state.game.peers;
}
export function selectPeer(state: IState, id: string): RecordOf<IPeer> {
  return state.game.peers.get(id, Peer());
}

export function selectCurrentCard(state: IState): Option<RecordOf<ICard>> {
  return Option.from(state.game.cardList.first());
}

export function selectCurrentPeer(state: IState) {
  return state.game.peerList.first();
}

export function selectTeams(state: IState): Map<number, string> {
  return state.game.teams;
}

export function selectPeerCards(
  state: IState,
  id: string
): Map<number, RecordOf<ICard>> {
  return state.game.cards.get(id, Map());
}

export function selectCards(state: IState): List<RecordOf<ICard>> {
  return state.game.cards.reduce(
    (cards, peerCards) => cards.merge(peerCards.toList()),
    List()
  );
}

export function selectDoneWithCards(state: IState, peerId: string): boolean {
  return state.game.peers.get(peerId, Peer()).doneWithCards;
}

export function selectEveryoneDoneWithCards(state: IState): boolean {
  const peers = state.game.peers.valueSeq().toArray();

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
