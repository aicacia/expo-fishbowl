import { createDispatcher, mergeReducers } from "@aicacia/state";
import { getPeer } from "../peer";
import * as game from "./game";
import { state, useMapStateToProps, connect } from "./lib/state";
export type { IState } from "./lib/state";

export const dispatch = createDispatcher(
  state,
  mergeReducers({
    [game.STORE_NAME]: game.reducer,
  })
);

getPeer().then((peer) => {
  peer.on("message", dispatch);
});

export { state, useMapStateToProps, connect };
export { game };
