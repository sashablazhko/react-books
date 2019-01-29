import Api from "./Api";
import { handleResponse } from "../helpers";

export const authService = {
  signUp,
  login,
  logout,
  refres,
  me,
  payload,
};

function signUp(email, password) {
  return Api()
    .post("/auth/signup", { email, password })
    .then(handleResponse)
    .then(data => data.message);
}
function login(email, password) {
  return Api()
    .post("/auth/login", { email, password })
    .then(handleResponse)
    .then(data => data.access_token);
}
function logout(token) {
  Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return Api()
    .post("./auth/logout")
    .then(handleResponse)
    .then(data => data.message);
}
function refres(accessToken) {
  Api().defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return Api()
    .post("/auth/refresh")
    .then(handleResponse)
    .then(data => data.access_token);
}
function me(accessToken) {
  Api().defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return Api()
    .post("/auth/me")
    .then(handleResponse)
    .then(data => data.email);
}
function payload() {
  return;
}
