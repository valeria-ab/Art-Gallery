import { Dispatch } from 'redux';
import { authAPI } from '../utils/api';
import { setAppStatus } from './app-reducer';

export type AuthState = {
  // error: string;
  // redirectToLogin: boolean;
  isInitialized: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};
export const setInitialized = (payload: { value: boolean }) => ({
  type: 'AUTH/SET-IS_INITIALIZED',
  payload,
} as const);
export const setUserData = (payload: { accessToken: string, refreshToken: string }) => ({
  type: 'AUTH/SET-USER-DATA',
  payload,
} as const);

export type AuthActions =
    | ReturnType<typeof setInitialized>
    | ReturnType<typeof setUserData>

export const AuthInitialState: AuthState = {
  // error: string;
  // redirectToLogin: boolean;
  isInitialized: false,
  accessToken: null,
  refreshToken: null,

};

export const authReducer = (
  state: AuthState = AuthInitialState,
  action: AuthActions,
) => {
  switch (action.type) {
    case 'AUTH/SET-IS_INITIALIZED':
      return { ...state, ...action.payload };

    default: {
      return state;
    }
  }
};

export const signUpTC = (username: string, password: string, fingerprint: string) => (
  dispatch: Dispatch,
) => {
  dispatch(setAppStatus({ status: 'loading' }));
  authAPI.register({ username, password, fingerprint })
    .then((res) => {
      dispatch(setUserData({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};

// export const signIn = (username: string, password: string) => (dispatch: Dispatch) => {
//   dispatch(setAppLoading('loading'));
//   authApi
//     .login(payload)
//     .then((res) => {
//       // dispatch(loginSuccess());
//       dispatch(setUserProfile(res.data));
//       dispatch(setInitializedAC(true));
//       dispatch(loginError(''));
//       dispatch(setErrorAC(null));
//     })
//     .catch((err) => {
//       const error = err.response
//         ? err.response.data.error
//         : `${err.message}, more details in the console`;
//       console.log('Error: ', { ...err });
//       dispatch(loginError(error));
//       // dispatch(setErrorAC(error))
//     })
//     .finally(() => dispatch(setAppLoading('succeeded')));
// };

// export const checkAuthMe = () => (dispatch: Dispatch) => {
//   dispatch(setAppStatus({ status: 'loading' }));
//   authAPI.refresh()
//     .then((res) => {
//       // dispatch(setAppLoading(false))
//       dispatch(setInitialized(true));
//     })
//     .catch((err) => {
//       console.log(err.response.data.error);
//       // dispatch(redirectToLogin(true));
//     })
//     .finally(() => dispatch(setAppStatus({ status: 'idle' })));
// };

// export const logOut = () => (dispatch: Dispatch) => {
//   dispatch(setAppLoading('loading'));
//   authApi
//     .logOut()
//     .then((res) => {
//       dispatch(setInitializedAC(false));
//       dispatch(setUserProfile({
//         _id: '',
//         email: '',
//         name: '',
//         avatar: '',
//         publicCardPacksCount: 0,
//         created: '',
//         updated: '',
//         isAdmin: false,
//         verified: false,
//         rememberMe: false,
//         error: '',
//         token: '',
//         tokenDeathTime: 0,
//         __v: 0,
//       }));
//       dispatch(setCardPacksPageCountAC(10));
//       dispatch(setCardsPageCountAC(10));
//       dispatch(setCardsPacksCountFromRangeAC([0, 1000]));
//       dispatch(redirectToLogin(true));
//
//       dispatch(setWithMyIdAC(true));
//       dispatch(changeLayoutAC('profile'));
//       dispatch(setSortPacksValueAC(''));
//     })
//     .catch((err) => {
//       const error = err.response
//         ? err.response.data.error
//         : `${err.message}, more details in the console`;
//       console.log('Error: ', { ...err });
//       dispatch(loginError(error));
//       dispatch(setErrorAC(error));
//     })
//     .finally(() => dispatch(setAppLoading('idle')));
// };
