import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "./screens/Home/HomeScreen";
import { GameScreen } from "./screens/Game/GameScreen";
import { Loading } from "./Loading";
import {
  DEFAULT_SCREEN,
  GAME_SCREEN,
  HOME_SCREEN,
  linking,
  ParamList,
} from "./navigationConfig";

export const { Navigator, Screen } = createStackNavigator<ParamList>();

export function Navigation() {
  return (
    <NavigationContainer linking={linking} fallback={<Loading />}>
      <NavigationStack />
    </NavigationContainer>
  );
}

function NavigationStack() {
  return (
    <Navigator
      initialRouteName={DEFAULT_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
      detachInactiveScreens
    >
      <Screen name={HOME_SCREEN} component={HomeScreen} />
      <Screen name={GAME_SCREEN} component={GameScreen} />
    </Navigator>
  );
}
