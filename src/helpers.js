import { OrderedMap, Map } from "immutable";

export function arrToMap(arr, key = "id", DataRecord = Map) {
  return arr.reduce((acc, item) => acc.set(item[key].toString(), new DataRecord(item)), new OrderedMap({}));
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

export function handleResponse(res) {
  console.log("res", res);
  const { data } = res;
  if (res.statusText !== "OK") {
    if (res.status === 401) {
      // auto logout if 401 response returned from api
      console.log("TODO LOGOUT");
    }

    const err = (data && data.message) || res.statusText;
    return Promise.reject(err);
  }

  return data;
}
