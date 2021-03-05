import { debounce } from "@aicacia/debounce";
import {
  createGameSyncAction,
  createGameDeleteCardAction,
  createGameSetDoneWithCardsAction,
  createGameSetCardTextAction,
  createGameSetNameAction,
  createGameSetStateAction,
  createGameSetTeamAction,
  createGameSetTeamNameAction,
  createGameInitRoundActionAction,
  IGameAction,
  createGameTrustAction,
} from "./actions";
import { GameState } from "./definitions";
import { store } from "..";
import { getPeer } from "../../peer";
import { getIdFromAppId } from "../../id";

export function setGameState(state: GameState) {
  broadcastAndDispatch(createGameSetStateAction(state));
}

export function initRound(seed: number) {
  broadcastAndDispatch(createGameInitRoundActionAction(seed));
}

export const setTeamName = debounce((team: number, name: string) => {
  broadcastAndDispatch(createGameSetTeamNameAction(team, name));
}, 1000);

export const setPeerName = debounce((peerId: string, name: string) => {
  broadcastAndDispatch(createGameSetNameAction(peerId, name));
}, 1000);

export function setPeerTeam(id: string, team: number) {
  broadcastAndDispatch(createGameSetTeamAction(id, team));
}

export const setCardText = debounce(
  (peerId: string, index: number, text: string) => {
    broadcastAndDispatch(createGameSetCardTextAction(peerId, index, text));
  },
  1000
);

export function deleteCard(peerId: string, index: number) {
  broadcastAndDispatch(createGameDeleteCardAction(peerId, index));
}

export function setDoneWithCards(peerId: string, doneWithCards: boolean) {
  broadcastAndDispatch(createGameSetDoneWithCardsAction(peerId, doneWithCards));
}

function broadcastAndDispatch(action: IGameAction) {
  store.dispatch(action);
  getPeer().then((peer) => peer.broadcast(action));
}

getPeer().then((peer) => {
  setPeerName(peer.getId(), getIdFromAppId(peer.getId()));

  peer.on("connection", (id) => {
    peer.send(
      id,
      createGameSyncAction(peer.getId(), store.getState().game.toJS() as any)
    );
  });

  peer.on("message", (message) => {
    store.dispatch(message);
    store.dispatch(createGameTrustAction());
  });
});
