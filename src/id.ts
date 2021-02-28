import { range } from "@aicacia/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ID_KEY = "ID",
  CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  PREFIX = "fishbowl-aicacia-com-";

function randomId(size = 6) {
  return range(0, size)
    .iter()
    .map(() => CHARS.charAt(Math.floor(Math.random() * CHARS.length)))
    .toArray()
    .join("");
}

export function getAppId(id: string) {
  return PREFIX + id;
}

export function getIdFromAppId(appId: string) {
  return appId.substring(PREFIX.length);
}

export async function getId(size = 6) {
  let id = await AsyncStorage.getItem(ID_KEY);

  if (id) {
    return id;
  } else {
    id = randomId(size);
    await AsyncStorage.setItem(ID_KEY, id);
    return id;
  }
}
