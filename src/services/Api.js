import axios from "axios";
import { apiHost } from "../config";

export default () => {
  return axios.create({
    baseURL: `${apiHost}/api`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const axiosClear = () => {
  return axios.create({
    baseURL: `${apiHost}/api`,
    withCredentials: false,
  });
};
