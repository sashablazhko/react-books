import Auth from "../services/AuthService";
import Api from "../services/Api";
import { Record } from "immutable";
import { toast } from "react-toastify";
import { takeEvery, put, select } from "redux-saga/effects";

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

export const moduleName = "auth";
export const SIGN_UP_REQUEST = `${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${moduleName}/SIGN_UP_ERROR`;
export const SIGN_IN_REQUEST = `${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${moduleName}/SIGN_IN_ERROR`;
export const SIGN_OUT = `${moduleName}/SIGN_OUT`;
export const SIGN_OUT_REQUEST = `${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${moduleName}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_ERROR = `${moduleName}/SIGN_OUT_ERROR`;

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
        .set("redirectToReferrer", true)
        .setIn(["user", "id"], payload.id)
        .setIn(["user", "accessToken"], payload.accessToken)
        .setIn(["user", "email"], payload.email)
        .setIn(["user", "status"], payload.status)
        .setIn(["user", "expirationDate"], payload.expirationDate);

    case SIGN_IN_ERROR:
      return state
        .set("loading", false)
        .set("error", true)
        .set("errorMsg", payload.errMsg);

    case SIGN_OUT_SUCCESS:
      return new ReducerState();

    default:
      return state;
  }
}

export function singInSuccess(email, serverToken) {
  return dispatch => {
    const base64Url = serverToken.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const serverAuthRes = JSON.parse(window.atob(base64));
    console.log("serverAuthRes", serverAuthRes);
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: {
        id: serverAuthRes.sub,
        accessToken: serverToken,
        email: email,
        status: serverAuthRes.status,
        expirationDate: new Date(serverAuthRes.exp * 1000),
      },
    });
  };
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
        console.log("res", res);
        dispatch(singInSuccess(email, res.data.access_token));
      },
      err => {
        console.log("SIGN IN ERR", err);
        dispatch({
          type: SIGN_IN_ERROR,
          payload: {
            errMsg: err.response.data.error,
          },
        });
        toast.error(err.response.data.error);
      }
    );
  };
}

// export function signOut() {
//   return dispatch => {
//     dispatch({
//       type: SIGN_OUT_REQUEST,
//     });

//     Auth.logout().then(
//       res => {
//         console.log("res", res);
//       },
//       err => {
//         console.log("SIGN OUT ERR", err);
//         dispatch({
//           type: SIGN_OUT_ERROR,
//           payload: {
//             errMsg: err.response.data.error,
//           },
//         });
//         toast.error(err.response.data.error);
//       }
//     );
//   };
// }

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

const signOutSaga = function*(action) {
  yield put({
    type: SIGN_OUT_REQUEST,
  });
  try {
    const getToken = state => state.auth.user.accessToken;
    const token = yield select(getToken);
    Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const {
      data: { message },
    } = yield Api().post("./auth/logout");
    if (message === "Successfully logged out") {
      yield put({
        type: SIGN_OUT_SUCCESS,
      });
    }
  } catch (err) {
    console.log("SIGN OUT ERR", err);
    yield put({
      type: SIGN_OUT_ERROR,
      payload: {
        errMsg: err.response.data.error,
      },
    });
    toast.error(err.response.data.error);
  }
};

export const saga = function*() {
  yield [takeEvery(SIGN_OUT, signOutSaga)];
};
