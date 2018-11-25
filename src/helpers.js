import { OrderedMap, Map } from "immutable";

export function arrToMap(arr, key = "id", DataRecord = Map) {
  return arr.reduce((acc, item) => acc.set(item[key], new DataRecord(item)), new OrderedMap({}));
}
