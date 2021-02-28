import { initReduxDevTools, IStateTypeOf, State } from "@aicacia/state";
import { createHook, createConnect } from "@aicacia/state-react";
import {
  fromJSON as gameFromJSON,
  INITIAL_STATE as game,
  STORE_NAME as gameName,
} from "../game/definitions";

export const state = new State(
  {
    [gameName]: game,
  },
  {
    [gameName]: gameFromJSON,
  }
);
export type IState = IStateTypeOf<typeof state>;

export const connect = createConnect(state);

export const useMapStateToProps = createHook(state);

if (process.env.NODE_ENV !== "production") {
  initReduxDevTools(state);
}
