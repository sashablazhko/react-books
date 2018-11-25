import Auth from "../services/AuthService";
import { Record, Map } from "immutable";

const ReducerState = Record({
  user: new Map({
    accessToken: null,
    email: null,
    expirationDate: null,
  }),
  loading: false,
  error: null,
  errorMsg: null,
});

export const moduleName = "auth";
export const SIGN_UP_REQUEST = `${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${moduleName}/SIGN_UP_ERROR`;
export const SIGN_IN_REQUEST = `${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`;

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
      return state.set("loading", true);

    case SIGN_UP_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .set("errorMsg", null);

    case SIGN_UP_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с регистрацией");

    case SIGN_IN_REQUEST:
      return state.set("loading", true);

    case SIGN_IN_SUCCESS:
      return state
        .set("loading", false)
        .set("error", null)
        .setIn(["user", "accessToken"], payload.accessToken)
        .setIn(["user", "email"], payload.email)
        .setIn(["user", "expirationDate"], payload.expirationDate);

    case SIGN_IN_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", "Проблемы с авторизацией");

    default:
      return state;
  }
}

//TODO saga
export function signUp(email, password) {
  return dispatch => {
    dispatch({
      type: SIGN_UP_REQUEST,
    });

    Auth.signUp(email, password).then(
      res => {
        if (res.data.message === "Successfully created user!") {
          dispatch(signIn(email, password));
        } else {
          dispatch({
            type: SIGN_UP_ERROR,
          });
        }
      },
      err => {
        console.log("SIGN UP ERR", err);
        dispatch({
          type: SIGN_UP_ERROR,
          err,
        });
      }
    );
  };
}

export function signIn(email, password) {
  return dispatch => {
    dispatch({
      type: SIGN_IN_REQUEST,
    });

    Auth.login(email, password).then(
      res => {
        const { expires_in, access_token } = res.data;
        const expirationDate = new Date(new Date().getTime() + expires_in * 1000);

        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("email", email);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: {
            accessToken: access_token,
            email,
            expirationDate,
          },
        });
      },
      err => {
        console.log("SIGN IN ERR", err);
        dispatch({
          type: SIGN_IN_ERROR,
          err,
        });
      }
    );
  };
}
