import Cookies from "js-cookie";
import { authAPI } from "../utils/api";
import { setAppError, setAppStatus } from "./app-reducer";
import { AppThunk, IAppStore } from "./store";
// @ts-ignore
import { ClientJS } from "clientjs";

export type AuthState = {
  isInitialized: boolean;
  isLoggedIn: boolean;
};
export const setInitialized = (payload: { isInitialized: boolean }) =>
  ({
    type: "AUTH/SET-IS_INITIALIZED",
    payload,
  } as const);
export const setLoggedIn = (payload: { isLoggedIn: boolean }) =>
  ({
    type: "AUTH/SET-IS_LOGGED_IN",
    payload,
  } as const);

export type AuthActions =
  | ReturnType<typeof setInitialized>
  | ReturnType<typeof setLoggedIn>;

export const AuthInitialState: AuthState = {
  isInitialized: false,
  isLoggedIn: false,
};

export const authReducer = (
  state: AuthState = AuthInitialState,
  action: AuthActions
) => {
  switch (action.type) {
    case "AUTH/SET-IS_INITIALIZED":
    case "AUTH/SET-IS_LOGGED_IN":
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

export const signUpTC =
  (username: string, password: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    authAPI
      .register({ username, password })
      .then((res) => {
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("refreshToken", res.data.refreshToken);
        dispatch(setLoggedIn({ isLoggedIn: true }));
      })
      .catch((error) => {
        dispatch(setAppError({ error: error.response.data.message }));
        setTimeout(() => {
          dispatch(setAppError({ error: "" }));
        }, 3000);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: "idle" }));
      });
  };
export const loginTC =
  (username: string, password: string): AppThunk =>
  (dispatch, getState: () => IAppStore) => {
    dispatch(setAppStatus({ status: "loading" }));

    authAPI
      .login(username, password)
      .then((res) => {
        Cookies.set("accessToken", res.data.accessToken);
        Cookies.set("refreshToken", res.data.refreshToken);
        dispatch(setLoggedIn({ isLoggedIn: true }));
      })
      .catch((error) => {
        dispatch(setAppError({ error: error.response.data.message }));
        setTimeout(() => {
          dispatch(setAppError({ error: "" }));
        }, 3000);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: "idle" }));
      });
  };

export const checkAuth =
  (): AppThunk => async (dispatch, getState: () => IAppStore) => {
    dispatch(setAppStatus({ status: "loading" }));
    const { isLoggedIn } = getState().auth;
    const refreshToken = Cookies.get("refreshToken");

    if (refreshToken) {
      const client = new ClientJS();
      const fingerprint = client.getFingerprint().toString();
      authAPI
        .refresh({ refreshToken, fingerprint })
        .then((response) => {
          Cookies.set("accessToken", response.data.accessToken);
          Cookies.set("refreshToken", response.data.refreshToken);
          dispatch(setLoggedIn({ isLoggedIn: true }));
        })
        .catch((e) => {
          dispatch(setAppError({ error: e.response?.data?.message }));
          setTimeout(() => {
            dispatch(setAppError({ error: "" }));
          }, 3000);
        })
        .finally(() => {
          dispatch(setAppStatus({ status: "idle" }));
          dispatch(setInitialized({ isInitialized: true }));
        });
    } else {
      isLoggedIn && dispatch(setLoggedIn({ isLoggedIn: false }));
      dispatch(setInitialized({ isInitialized: true }));
    }
  };
