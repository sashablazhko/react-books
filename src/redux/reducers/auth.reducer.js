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
  const { type } = action;

  switch (type) {
    case authConstants.SIGN_UP_REQUEST:
    case authConstants.SIGN_IN_REQUEST:
    case authConstants.ME_REQUEST:
    case authConstants.SIGN_OUT_REQUEST:
    case authConstants.REFRESH_TOKEN_REQUEST:
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
        .setIn(["user", "id"], action.id)
        .setIn(["user", "accessToken"], action.accessToken)
        .setIn(["user", "email"], action.email)
        .setIn(["user", "status"], action.status)
        .setIn(["user", "expirationDate"], action.expirationDate);

    case authConstants.SIGN_OUT_SUCCESS:
      return new ReducerState();

    case authConstants.SIGN_UP_FAILURE:
    case authConstants.SIGN_IN_FAILURE:
    case authConstants.ME_FAILURE:
    case authConstants.SIGN_OUT_FAILURE:
    case authConstants.REFRESH_TOKEN_FAILURE:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", action.errMsg);

    default:
      return state;
  }
}
