import { authService, authService as Auth } from "../services/AuthService";
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
      email,
      ...tokenData,
    });
  };
}

export function signUp(email, password) {
  return dispatch => {
    dispatch(_request());

    authService
      .signUp(email, password)
      .then(
        message => {
          debugger;
          if (message === "Successfully created user") {
            dispatch(signIn(email, password));
          } else {
            return Promise.reject("Проблемы с регистрацией");
          }
        },
        err => {
          debugger;
          dispatch(_failure(err));
        }
      )
      .then(
        data => data,
        err => {
          debugger;
          dispatch(_failure(err));
        }
      );

    // authService.signUp(email, password).then(
    //   res => {
    //     if (res.data.message === "Successfully created user!") {
    //       dispatch(signIn(email, password));
    //     } else {
    //       dispatch({
    //         type: authConstants.API_AUTH_FAILURE,
    //       });
    //     }
    //   },
    //   err => {
    //     console.log("SIGN UP ERR", err);
    //     dispatch({
    //       type: authConstants.API_AUTH_FAILURE,
    //       payload: {
    //         errMsg: "Проблемы с регистрацией",
    //       },
    //     });
    //     toast.error("Проблемы с регистрацией");
    //   }
    // );
  };

  function _request() {
    return { type: authConstants.SIGN_UP_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: authConstants.SIGN_UP_FAILURE, errMsg };
  }
}

export function signIn(email, password) {
  return dispatch => {
    dispatch(_request());

    authService.login(email, password).then(
      accessToken => {
        dispatch(singInSuccess(email, accessToken));
      },
      err => {
        dispatch(_failure(err));
      }
    );
  };
  function _request() {
    return { type: authConstants.SIGN_IN_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: authConstants.SIGN_IN_FAILURE, errMsg };
  }
}

export function me(accessToken) {
  return dispatch => {
    dispatch(_request());

    authService.me(accessToken).then(
      email => {
        dispatch(singInSuccess(email, accessToken));
      },
      err => {
        cookies.remove("ACCESS_TOKEN", { path: "/" });
        dispatch(_failure(err));
      }
    );
  };

  function _request() {
    return { type: authConstants.ME_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: authConstants.ME_FAILURE, errMsg };
  }
}

export function refreshToken(accessToken) {
  return dispatch => {
    dispatch(_request());

    authService.refres(accessToken).then(
      newToken => {
        dispatch(me(newToken));
      },
      err => {
        cookies.remove("ACCESS_TOKEN", { path: "/" });
        dispatch(_failure(err));
      }
    );
  };

  function _request() {
    return { type: authConstants.REFRESH_TOKEN_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: authConstants.REFRESH_TOKEN_FAILURE, errMsg };
  }
}

export function signOut() {
  return dispatch => {
    dispatch(_request());

    const token = cookies.get("ACCESS_TOKEN");
    authService.logout(token).then(
      message => {
        cookies.remove("ACCESS_TOKEN", { path: "/" });
        if (message === "Successfully logged out") {
          dispatch(_success());
        } else {
          return Promise.reject("Проблемы с выходом");
        }
      },
      err => {
        cookies.remove("ACCESS_TOKEN", { path: "/" });
        dispatch(_failure(err));
      }
    );
  };

  function _success() {
    return { type: authConstants.SIGN_OUT_SUCCESS };
  }
  function _request() {
    return { type: authConstants.SIGN_OUT_REQUEST };
  }
  function _failure(err) {
    const errMsg = (err.response && err.response.data.error) || err.toString();
    toast.error(errMsg);
    return { type: authConstants.SIGN_OUT_FAILURE, errMsg };
  }
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
//       type: authConstants.SIGN_OUT_FAILURE,
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
