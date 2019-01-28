import { Record } from "immutable";

import { authConstants } from "../../constants/auth.constants";

const UserRecord = Record({
  id: null,
  accessToken: null,
  email: null,
  status: null,
  expirationDate: null,
});

const ReducerState = Record({
  user: new UserRecord(),
  loading: false,
  redirectToReferrer: false,
  error: null,
  errorMsg: null,
});

export function auth(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case authConstants.API_AUTH_REQUEST:
      return state.set("loading", true);

    case authConstants.SIGN_UP_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .set("errorMsg", null);

    case authConstants.SIGN_IN_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .set("redirectToReferrer", true)
        .setIn(["user", "id"], payload.id)
        .setIn(["user", "accessToken"], payload.accessToken)
        .setIn(["user", "email"], payload.email)
        .setIn(["user", "status"], payload.status)
        .setIn(["user", "expirationDate"], payload.expirationDate);

    case authConstants.SIGN_OUT_SUCCESS:
      return new ReducerState();

    case authConstants.API_AUTH_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", payload.errMsg);

    default:
      return state;
  }
}
