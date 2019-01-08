import Api from "./Api";

export default {
  signUp(email, password) {
    return Api().post("/auth/signup", { email, password });
  },
  login(email, password) {
    return Api().post("/auth/login", { email, password });
  },
  logout() {
    return Api().post("./auth/logout");
  },
  refres() {
    return;
  },
  me() {
    return;
  },
  payload() {
    return;
  },
};
