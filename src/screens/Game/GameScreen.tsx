import React from "react";
import { Async } from "@aicacia/async_component-react";
import { JSError } from "../../JSError";
import { Loading } from "../../Loading";
import { Container } from "../../Container";
import { GAME_SCREEN, ParamList } from "../../navigationConfig";
import { RouteProp } from "@react-navigation/native";

export interface IGameScreenProps {
  route: RouteProp<ParamList, typeof GAME_SCREEN>;
}

export function GameScreen(props: IGameScreenProps) {
  return (
    <Container>
      <Async
        promise={import("./Game")}
        onSuccess={({ Game }) => <Game id={props.route.params.id} />}
        onPending={() => <Loading />}
        onError={(error) => <JSError error={error} />}
      />
    </Container>
  );
}
