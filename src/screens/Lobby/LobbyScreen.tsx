import React from "react";
import { Async } from "@aicacia/async_component-react";
import { JSError } from "../../JSError";
import { Loading } from "../../Loading";
import { Container } from "../../Container";
import { GAME_SCREEN, ParamList } from "../../navigationConfig";
import { RouteProp } from "@react-navigation/native";

export interface ILobbyScreenProps {
  route: RouteProp<ParamList, typeof GAME_SCREEN>;
}

export function LobbyScreen(props: ILobbyScreenProps) {
  return (
    <Container>
      <Async
        promise={import("./Lobby")}
        onSuccess={({ Lobby }) => <Lobby id={props.route.params.id} />}
        onPending={() => <Loading />}
        onError={(error) => <JSError error={error} />}
      />
    </Container>
  );
}
