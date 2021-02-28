import {
  gameSetNameAction,
  gameSetTeamAction,
  gameSetTeamNameAction,
  gameSyncAction,
  IGame,
  IPeer,
  Peer,
  peersFromJSON,
  STORE_NAME,
} from "./definitions";
import { state } from "../lib/state";
import { getPeer } from "../../peer";
import { debounce } from "@aicacia/debounce";
import { Map, RecordOf } from "immutable";
import { IAction } from "@aicacia/state";

export const store = state.getStore(STORE_NAME);

function updatePeer(
  state: RecordOf<IGame>,
  id: string,
  updater: (peer: RecordOf<IPeer>) => RecordOf<IPeer>
) {
  return state.update("peers", (peers) => {
    const peer = peers.get(id, Peer());
    return peers.set(id, updater(peer));
  });
}

function setStatePeerName(state: RecordOf<IGame>, id: string, name: string) {
  return updatePeer(state, id, (peer) => peer.set("name", name));
}

export function setPeerName(id: string, name: string) {
  store.update((state) => setStatePeerName(state, id, name));
}

function setStatePeerTeam(state: RecordOf<IGame>, id: string, team: number) {
  return updatePeer(state, id, (peer) => peer.set("team", team));
}

export function setPeerTeam(id: string, team: number) {
  store.update((state) => setStatePeerTeam(state, id, team));
}

function setStateTeamName(state: RecordOf<IGame>, team: number, name: string) {
  return state.update("teams", (teams) => teams.set(team, name));
}

export function setTeamName(team: number, name: string) {
  store.update((state) => setStateTeamName(state, team, name));
}

function setStatePeers(
  state: RecordOf<IGame>,
  peers: Map<string, RecordOf<IPeer>>
) {
  return state.update("peers", (state) => state.merge(peers));
}

export function setPeers(peers: Map<string, RecordOf<IPeer>>) {
  store.update((state) => setStatePeers(state, peers));
}

export const gameSetTeamName = debounce((team: number, name: string) => {
  setTeamName(team, name);
  getPeer().then((peer) =>
    peer.broadcast(gameSetTeamNameAction.create({ team, name }))
  );
}, 500);

export const gameSetPeerName = debounce((id: string, name: string) => {
  setPeerName(id, name);
  getPeer().then((peer) =>
    peer.broadcast(gameSetNameAction.create({ id, name }))
  );
}, 500);

export function gameSetPeerTeam(id: string, team: number) {
  setPeerTeam(id, team);
  getPeer().then((peer) =>
    peer.broadcast(gameSetTeamAction.create({ id, team }))
  );
}

export function reducer(
  state: RecordOf<IGame>,
  action: IAction
): RecordOf<IGame> {
  if (gameSetNameAction.is(action)) {
    return setStatePeerName(state, action.payload.id, action.payload.name);
  } else if (gameSetTeamAction.is(action)) {
    return setStatePeerTeam(state, action.payload.id, action.payload.team);
  } else if (gameSetTeamNameAction.is(action)) {
    return setStateTeamName(state, action.payload.team, action.payload.name);
  } else if (gameSyncAction.is(action)) {
    return setStatePeers(state, peersFromJSON(action.payload.peers as any));
  } else {
    return state;
  }
}

getPeer().then((peer) => {
  peer.on("connection", (id) => {
    peer.send(id, gameSyncAction.create(store.getCurrent().toJS()));
  });
});
