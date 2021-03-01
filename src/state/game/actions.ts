import {
  setNameAction,
  setTeamAction,
  setTeamNameAction,
  setStateAction,
  setDoneWithCardsAction,
  syncAction,
  GameState,
  setCardTextAction,
} from "./definitions";
import { dispatch, state } from "../lib/state";
import { getPeer } from "../../peer";
import { debounce } from "@aicacia/debounce";
import { getIdFromAppId } from "../../id";
import { IAction } from "@aicacia/state";

export function setGameState(state: GameState) {
  const action = setStateAction.create(state);
  broadcastAndDispatch(action);
}

export const setTeamName = debounce((team: number, name: string) => {
  const action = setTeamNameAction.create({ team, name });
  broadcastAndDispatch(action);
}, 1000);

export const setPeerName = debounce((id: string, name: string) => {
  const action = setNameAction.create({ id, name });
  broadcastAndDispatch(action);
}, 1000);

export function setPeerTeam(id: string, team: number) {
  const action = setTeamAction.create({ id, team });
  broadcastAndDispatch(action);
}

export const setCardText = debounce(
  (peerId: string, index: number, text: string) => {
    const action = setCardTextAction.create({ peerId, index, text });
    broadcastAndDispatch(action);
  },
  1000
);

export function setDoneWithCards(peerId: string, doneWithCards: boolean) {
  const action = setDoneWithCardsAction.create({ peerId, doneWithCards });
  broadcastAndDispatch(action);
}

function broadcastAndDispatch(action: IAction) {
  dispatch(action);
  getPeer().then((peer) => peer.broadcast(action));
}

getPeer().then((peer) => {
  setPeerName(peer.getId(), getIdFromAppId(peer.getId()));

  peer.on("connection", (id) => {
    peer.send(
      id,
      syncAction.create({
        from: peer.getId(),
        state: state.getCurrent().game.toJS() as any,
      })
    );
  });
});
