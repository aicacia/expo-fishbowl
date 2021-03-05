import { Action } from "redux";
import { IJSONObject } from "@aicacia/json";
import { GameState } from "./definitions";

export const GAME_TRUST = "game.trust";

export interface IGameTrustAction extends Action<typeof GAME_TRUST> {}

export function createGameTrustAction(): IGameTrustAction {
  return {
    type: GAME_TRUST,
  };
}

export const GAME_SYNC = "game.sync";

export interface IGameSyncAction extends Action<typeof GAME_SYNC> {
  from: string;
  state: IJSONObject;
}

export function createGameSyncAction(
  from: string,
  state: IJSONObject
): IGameSyncAction {
  return {
    type: GAME_SYNC,
    from,
    state,
  };
}

export const GAME_SET_STATE = "game.set-state";

export interface IGameSetStateAction extends Action<typeof GAME_SET_STATE> {
  state: GameState;
}

export function createGameSetStateAction(
  state: GameState
): IGameSetStateAction {
  return {
    type: GAME_SET_STATE,
    state,
  };
}

export const GAME_INIT_ROUND = "game.init-round";

export interface IGameInitRoundAction extends Action<typeof GAME_INIT_ROUND> {
  seed: number;
}

export function createGameInitRoundActionAction(
  seed: number
): IGameInitRoundAction {
  return {
    type: GAME_INIT_ROUND,
    seed,
  };
}

export const GAME_SET_NAME = "game.set-name";

export interface IGameSetNameAction extends Action<typeof GAME_SET_NAME> {
  peerId: string;
  name: string;
}

export function createGameSetNameAction(
  peerId: string,
  name: string
): IGameSetNameAction {
  return {
    type: GAME_SET_NAME,
    peerId,
    name,
  };
}

export const GAME_SET_TEAM = "game.set-team";

export interface IGameSetTeamAction extends Action<typeof GAME_SET_TEAM> {
  peerId: string;
  team: number;
}

export function createGameSetTeamAction(
  peerId: string,
  team: number
): IGameSetTeamAction {
  return {
    type: GAME_SET_TEAM,
    peerId,
    team,
  };
}

export const GAME_SET_TEAM_NAME = "game.set-team-name";

export interface IGameSetTeamNameAction
  extends Action<typeof GAME_SET_TEAM_NAME> {
  team: number;
  name: string;
}

export function createGameSetTeamNameAction(
  team: number,
  name: string
): IGameSetTeamNameAction {
  return {
    type: GAME_SET_TEAM_NAME,
    name,
    team,
  };
}

export const GAME_SET_CARD_TEXT = "game.set-card-text";

export interface IGameSetCardTextAction
  extends Action<typeof GAME_SET_CARD_TEXT> {
  peerId: string;
  index: number;
  text: string;
}

export function createGameSetCardTextAction(
  peerId: string,
  index: number,
  text: string
): IGameSetCardTextAction {
  return {
    type: GAME_SET_CARD_TEXT,
    peerId,
    index,
    text,
  };
}

export const GAME_DELETE_CARD = "game.delete-card";

export interface IGameDeleteCardAction extends Action<typeof GAME_DELETE_CARD> {
  peerId: string;
  index: number;
}

export function createGameDeleteCardAction(
  peerId: string,
  index: number
): IGameDeleteCardAction {
  return {
    type: GAME_DELETE_CARD,
    peerId,
    index,
  };
}

export const GAME_SET_DONE_WITH_CARDS = "game.set-done-with-cards";

export interface IGameGameSetDoneWithCardsAction
  extends Action<typeof GAME_SET_DONE_WITH_CARDS> {
  peerId: string;
  doneWithCards: boolean;
}

export function createGameSetDoneWithCardsAction(
  peerId: string,
  doneWithCards: boolean
): IGameGameSetDoneWithCardsAction {
  return {
    type: GAME_SET_DONE_WITH_CARDS,
    peerId,
    doneWithCards,
  };
}

export type IGameAction =
  | IGameTrustAction
  | IGameSyncAction
  | IGameGameSetDoneWithCardsAction
  | IGameDeleteCardAction
  | IGameSetCardTextAction
  | IGameSetNameAction
  | IGameSetTeamNameAction
  | IGameInitRoundAction
  | IGameSetStateAction
  | IGameSetTeamAction;
