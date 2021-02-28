import React from "react";
import once from "once";
import { View } from "react-native";
import { Props } from "react-native-google-cast/lib/typescript/src/components/CastButton";
import { receiverApplicationId } from "../app.json";

export default function CastButton(props: Props) {
  const GoogleCastLancher: any = "google-cast-launcher";

  injectGoogleCast();

  return (
    <View {...props}>
      <GoogleCastLancher />
    </View>
  );
}

const injectGoogleCast = once(() => {
  const onGCastApiAvailable = (available: boolean, reason: string) => {
    if (available) {
      cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
    } else {
      console.error(reason);
    }
  };

  window.__onGCastApiAvailable = onGCastApiAvailable as (
    available: boolean
  ) => void;

  const script = document.createElement("script");
  script.src =
    "//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
  document.body.appendChild(script);
});
