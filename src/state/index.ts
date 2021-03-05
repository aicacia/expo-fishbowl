import { createStore, combineReducers } from "redux";
import { createUseReduxStore } from "@aicacia/use-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as gameReducer } from "./game/reducer";

export const store = createStore(
  combineReducers({
    game: gameReducer,
  }),
  composeWithDevTools()
);

export type IState = ReturnType<typeof store["getState"]>;

export const useReduxStore = createUseReduxStore(store);
