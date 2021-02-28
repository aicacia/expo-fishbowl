import {
  initReduxDevTools,
  IStateTypeOf,
  State,
  createDispatcher,
  mergeReducers,
} from "@aicacia/state";
import { createHook, createConnect } from "@aicacia/state-react";
import {
  fromJSON as gameFromJSON,
  INITIAL_STATE as game,
  STORE_NAME as gameName,
  reducer as gameReducer,
} from "../game/definitions";
import { getPeer } from "../../peer";

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

export const dispatch = createDispatcher(
  state,
  mergeReducers({
    [gameName]: gameReducer,
  })
);

getPeer().then((peer) => {
  peer.on("message", dispatch);
});

if (process.env.NODE_ENV !== "production") {
  initReduxDevTools(state);
}
