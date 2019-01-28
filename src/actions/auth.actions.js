import { authService as Auth } from "../services/AuthService";
import Api from "../services/Api";
import { Record } from "immutable";
import { toast } from "react-toastify";
// import { takeEvery, put, select } from "redux-saga/effects";
import Cookies from "universal-cookie";

import { authConstants } from "../constants/auth.constants";
import { decodeToken } from "../helpers";

const cookies = new Cookies();

export function singInSuccess(email, serverToken) {
  return dispatch => {
    cookies.set("ACCESS_TOKEN", serverToken, { path: "/" });
    const tokenData = decodeToken(serverToken);
    dispatch({
      type: authConstants.SIGN_IN_SUCCESS,
      payload: {
        email,
        ...tokenData,
      },
    });
  };
}

export function signUp(email, password) {
  return dispatch => {
    dispatch({
      type: authConstants.API_AUTH_REQUEST,
    });

    Auth.signUp(email, password).then(
      res => {
        if (res.data.message === "Successfully created user!") {
          dispatch(signIn(email, password));
        } else {
          dispatch({
            type: authConstants.API_AUTH_ERROR,
          });
        }
      },
      err => {
        console.log("SIGN UP ERR", err);
        dispatch({
          type: authConstants.API_AUTH_ERROR,
          payload: {
            errMsg: "Проблемы с регистрацией",
          },
        });
        toast.error("Проблемы с регистрацией");
      }
    );
  };
}

// export function signIn(email, password) {
//   return dispatch => {
//     dispatch({
//       type: authConstants.API_AUTH_REQUEST,
//     });

//     Auth.login(email, password).then(
//       res => {
//         console.log("res", res);
//         dispatch(singInSuccess(email, res.data.access_token));
//       },
//       err => {
//         console.log("SIGN IN ERR", err);
//         dispatch({
//           type: authConstants.API_AUTH_ERROR,
//           payload: {
//             errMsg: err.response.data.error,
//           },
//         });
//         toast.error(err.response.data.error);
//       }
//     );
//   };
// }
export function signIn(email, password) {
  return async dispatch => {
    dispatch({
      type: authConstants.API_AUTH_REQUEST,
    });

    try {
      const res = await Auth.login(email, password);
      dispatch(singInSuccess(email, res.data.access_token));
    } catch (err) {
      console.log("SIGN IN ERR", err);
      dispatch({
        type: authConstants.API_AUTH_ERROR,
        payload: {
          errMsg: err.response.data.error,
        },
      });
      toast.error(err.response.data.error);
    }
  };
}

export function me(accessToken) {
  return async dispatch => {
    dispatch({
      type: authConstants.API_AUTH_REQUEST,
    });

    Api().defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    try {
      const res = await Api().post("/auth/me");
      dispatch(singInSuccess(res.data.email, accessToken));
    } catch (err) {
      console.log("ME ERR", err);
      dispatch({
        type: authConstants.API_AUTH_ERROR,
        payload: {
          errMsg: err.response.data.error,
        },
      });
      toast.error(err.response.data.error);
    }
  };
}

export function refreshToken(accessToken) {
  return async dispatch => {
    dispatch({
      type: authConstants.API_AUTH_REQUEST,
    });

    Api().defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    try {
      const res = await Api().post("/auth/refresh");
      dispatch(me(res.data.access_token));
    } catch (err) {
      console.log("REFRESH ERR", err);
      dispatch({
        type: authConstants.API_AUTH_ERROR,
        payload: {
          errMsg: err.response.data.error,
        },
      });
      toast.error(err.response.data.error);
    }
  };
}

export function signOut() {
  return async dispatch => {
    dispatch({
      type: authConstants.API_AUTH_REQUEST,
    });

    const token = cookies.get("ACCESS_TOKEN");
    Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const {
        data: { message },
      } = await Api().post("/auth/logout");
      if (message === "Successfully logged out") {
        cookies.remove("ACCESS_TOKEN");
        dispatch({
          type: authConstants.SIGN_OUT_SUCCESS,
        });
      }
    } catch (err) {
      console.log("SIGN OUT ERR", err);
      dispatch({
        type: authConstants.API_AUTH_ERROR,
        payload: {
          errMsg: err.response.data.error,
        },
      });
      toast.error(err.response.data.error);
    }
  };
}

// signOut redux-saga realization
// export function signOut() {
//   return {
//     type: authConstants.SIGN_OUT,
//   };
// }

// const signOutSaga = function*(action) {
//   yield put({
//     type: authConstants.API_AUTH_REQUEST,
//   });
//   try {
//     const getToken = state => state.auth.user.accessToken;
//     const token = yield select(getToken);
//     Api().defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     const {
//       data: { message },
//     } = yield Api().post("./auth/logout");
//     if (message === "Successfully logged out") {
//       cookies.remove("ACCESS_TOKEN");
//       yield put({
//         type: authConstants.SIGN_OUT_SUCCESS,
//       });
//     }
//   } catch (err) {
//     console.log("SIGN OUT ERR", err);
//     yield put({
//       type: authConstants.SIGN_OUT_ERROR,
//       payload: {
//         errMsg: err.response.data.error,
//       },
//     });
//     toast.error(err.response.data.error);
//   }
// };

// export const saga = function*() {
//   yield [takeEvery(SIGN_OUT, signOutSaga)];
// };
