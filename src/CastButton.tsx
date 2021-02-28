import React from "react";
import { CastButton as RNCastButton } from "react-native-google-cast";
import { Props } from "react-native-google-cast/lib/typescript/src/components/CastButton";

export default function CastButton(props: Props) {
  return <RNCastButton {...props} />;
}
