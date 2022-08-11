import Cookies from 'js-cookie';
// eslint-disable-next-line import/no-cycle
import { authAPI } from '../utils/api';
import { setAppError, setAppStatus } from './app-reducer';
// eslint-disable-next-line import/no-cycle
import { AppThunk, IAppStore } from './store';

export type AuthState = {
    // error: string;
    // redirectToLogin: boolean;
    isInitialized: boolean;
    accessToken: string ;
    refreshToken: string ;
    fingerprint: string;
};
export const setInitialized = (payload: { isInitialized: boolean }) => ({
  type: 'AUTH/SET-IS_INITIALIZED',
  payload,
} as const);
export const setUserData = (payload: {
    accessToken: string ;
    refreshToken: string ;
}) => ({
  type: 'AUTH/SET-USER-DATA',
  payload,
} as const);

export const setFingerPrint = (payload: { fingerprint: string }) => ({
  type: 'AUTH/SET-FINGERPRINT',
  payload,
} as const);

export type AuthActions =
    | ReturnType<typeof setInitialized>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setFingerPrint>;

export const AuthInitialState: AuthState = {
  // error: string;
  // redirectToLogin: boolean;
  isInitialized: false,
  accessToken: '',
  refreshToken: '',
  fingerprint: '',
};

export const authReducer = (
  state: AuthState = AuthInitialState,
  action: AuthActions,
) => {
  switch (action.type) {
    case 'AUTH/SET-IS_INITIALIZED': {
      return { ...state, ...action.payload };
    }
    case 'AUTH/SET-FINGERPRINT':
    case 'AUTH/SET-USER-DATA':
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

export const signUpTC = (
  username: string, password: string, fingerprint: string,
): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  authAPI
    .register({ username, password, fingerprint })
    .then((res) => {
      dispatch(
        setUserData({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }),
      );
      dispatch(setInitialized({ isInitialized: true }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const loginTC = (username: string, password: string): AppThunk => (dispatch,
  getState: () => IAppStore) => {
  dispatch(setAppStatus({ status: 'loading' }));
  const {
    fingerprint,
  } = getState().auth;
  authAPI
    .login(username, password)
    .then((res) => {
      Cookies.set('accessToken', res.data.accessToken, { path: 'http://localhost:3000' });
      Cookies.set('refreshToken', res.data.refreshToken, { path: 'http://localhost:3000' });
      dispatch(
        setUserData({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }),
      );
      dispatch(setInitialized({ isInitialized: true }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};

export const refreshTC = (): AppThunk => (dispatch,
  getState: () => IAppStore) => {
  const {
    refreshToken,
    fingerprint,
  } = getState().auth;
  dispatch(setAppStatus({ status: 'loading' }));
  if (refreshToken && fingerprint) {
    authAPI
      .refresh({ refreshToken, fingerprint })
      .then((res) => {
        dispatch(
          setUserData({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          }),
        );
        dispatch(setInitialized({ isInitialized: true }));
      })
      .catch((error) => {
        dispatch(setAppError({ error: error.response.data.message }));
      })
      .finally(() => {
        dispatch(setAppStatus({ status: 'idle' }));
      });
  }
};
