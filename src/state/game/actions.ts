import {
  setNameAction,
  setTeamAction,
  setTeamNameAction,
  setStateAction,
  syncAction,
  GameState,
} from "./definitions";
import { dispatch, state } from "../lib/state";
import { getPeer } from "../../peer";
import { debounce } from "@aicacia/debounce";
import { getIdFromAppId } from "../../id";

export function lobby() {
  const action = setStateAction.create(GameState.Lobby);
  dispatch(action);
  getPeer().then((peer) => peer.broadcast(action));
}

export function start() {
  const action = setStateAction.create(GameState.Started);
  dispatch(action);
  getPeer().then((peer) => peer.broadcast(action));
}

export const setTeamName = debounce((team: number, name: string) => {
  const action = setTeamNameAction.create({ team, name });
  dispatch(action);
  getPeer().then((peer) => peer.broadcast(action));
}, 500);

export const setPeerName = debounce((id: string, name: string) => {
  const action = setNameAction.create({ id, name });
  dispatch(action);
  getPeer().then((peer) => peer.broadcast(action));
}, 500);

export function setPeerTeam(id: string, team: number) {
  const action = setTeamAction.create({ id, team });
  dispatch(action);
  getPeer().then((peer) => peer.broadcast(action));
}

getPeer().then((peer) => {
  setPeerName(peer.getId(), getIdFromAppId(peer.getId()));

  peer.on("connection", (id) => {
    const gameState = state.getCurrent().game;

    if (gameState.state !== GameState.None) {
      peer.send(id, syncAction.create(gameState.toJS() as any));
    }
  });
});
