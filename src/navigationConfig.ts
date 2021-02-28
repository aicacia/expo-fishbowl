import { Platform } from "react-native";

export const HOME_SCREEN = "Home",
  LOBBY_SCREEN = "Lobby",
  GAME_SCREEN = "Game",
  DEFAULT_SCREEN = HOME_SCREEN;

export type ParamList = {
  [HOME_SCREEN]: {};
  [LOBBY_SCREEN]: {
    id: string;
  };
  [GAME_SCREEN]: {
    id: string;
  };
};

export const ENABLE_LINKING =
  global.location?.hostname === "localhost" ||
  (!("electron" in (global.process?.versions || {})) && Platform.OS !== "web");

export const linking = {
  prefixes: [
    "https://fishbowl.aicacia.com",
    "fishbowl.aicacia://",
    "https://aicacia.github.io/fishbowl",
  ],
  config: {
    screens: {
      [HOME_SCREEN]: "",
      [LOBBY_SCREEN]: "lobby/:id",
      [GAME_SCREEN]: "game/:id",
    },
  },
};

if (ENABLE_LINKING && process.env.NODE_ENV !== "production") {
  linking.prefixes.push(
    `${global.location?.protocol}//${global.location?.host}:${global.location?.port}`
  );
}
