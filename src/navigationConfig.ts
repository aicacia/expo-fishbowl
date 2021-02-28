export const HOME_SCREEN = "Home",
  LOBBY_SCREEN = "Lobby",
  GAME_SCREEN = "Game",
  DEFAULT_SCREEN = HOME_SCREEN;

export type ParamList = {
  [HOME_SCREEN]: Record<string, unknown>;
  [LOBBY_SCREEN]: {
    id: string;
  };
  [GAME_SCREEN]: {
    id: string;
  };
};

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
