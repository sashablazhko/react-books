import Api from "./Api";

export const authService = {
  signUp,
  login,
  logout,
  refres,
  me,
  payload,
};

function signUp(email, password) {
  return Api().post("/auth/signup", { email, password });
}
function login(email, password) {
  return Api().post("/auth/login", { email, password });
}
function logout() {
  return Api().post("./auth/logout");
}
function refres() {
  return;
}
function me() {
  return;
}
function payload() {
  return;
}
