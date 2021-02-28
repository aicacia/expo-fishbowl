import { Map, RecordOf, List } from "immutable";
import { IState } from "../lib/state";
import { IPeer, Peer, GameState, STORE_NAME } from "./definitions";

export function selectState(state: IState): GameState {
  return state[STORE_NAME].state;
}

export function selectPeers(state: IState): Map<string, RecordOf<IPeer>> {
  return state[STORE_NAME].peers;
}

export function selectPeer(state: IState, id: string): RecordOf<IPeer> {
  return state[STORE_NAME].peers.get(id, Peer());
}

export function selectTeams(state: IState): List<string> {
  return state[STORE_NAME].teams;
}
