import { OrderedMap, Map } from "immutable";

export function arrToMap(arr, key = "id", DataRecord = Map) {
  return arr.reduce((acc, item) => acc.set(item[key], new DataRecord(item)), new OrderedMap({}));
}

export function mapToArr(obj) {
  return obj.valueSeq().toArray();
}

export function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const serverAuthRes = JSON.parse(window.atob(base64));
  return {
    id: serverAuthRes.sub,
    accessToken: token,
    status: serverAuthRes.status,
    expirationDate: serverAuthRes.exp,
  };
}

export function isExpired(tokenExp) {
  const dateNow = parseInt(Date.now() / 1000, 10);
  return tokenExp > dateNow ? false : true;
}
