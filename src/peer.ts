import { none, Option } from "@aicacia/core";
import { Peer } from "@aicacia/peer";
import { useEffect, useState } from "react";
import { EventEmitter } from "events";
import PeerJS from "peerjs";
import { getId, getAppId } from "./id";
import { Action } from "redux";

export const APP_PEER_ID: Option<string> = none(),
  PEER: Option<Peer<Action>> = none();

const emitter = new EventEmitter();

export function getPeerId() {
  return new Promise<string>((resolve) =>
    APP_PEER_ID.ifSome(resolve).ifNone(() => emitter.once("peer-id", resolve))
  );
}

export function getPeer() {
  return new Promise<Peer<Action>>((resolve) =>
    PEER.ifSome(resolve).ifNone(() => emitter.once("peer", resolve))
  );
}

export function usePeer() {
  const [peer, setPeer] = useState(PEER.toJS());

  useEffect(() => {
    if (peer === null) {
      getPeer().then(setPeer);
    }
  }, [peer]);

  return peer;
}

export function usePeerId() {
  const [peerId, setPeerId] = useState(APP_PEER_ID.toJS());

  useEffect(() => {
    if (peerId === null) {
      getPeerId().then(setPeerId);
    }
  }, [peerId]);

  return peerId;
}

async function init() {
  const appPeerId = getAppId(await getId()),
    peer = await Peer.create<Action>(new PeerJS(appPeerId));

  peer.on("error", (error) => {
    console.error(error);
  });

  APP_PEER_ID.replace(appPeerId);
  PEER.replace(peer);

  emitter.emit("peer-id", appPeerId);
  emitter.emit("peer", peer);
}

init();
