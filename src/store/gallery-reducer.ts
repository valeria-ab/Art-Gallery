// eslint-disable-next-line import/no-cycle
import { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-cycle
import { ArtistResponseType, artistsAPI, privateInstance } from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk, IAppStore } from './store';
import { setAppStatus } from './app-reducer';
// eslint-disable-next-line import/no-cycle
import { refreshTC } from './auth-reducer';

export type InitialCardsStateType = {
  baseURL: string;
  artists: Array<ArtistResponseType>;
};

export const setArtists = (payload: { artists: Array<ArtistResponseType> }) => ({
  type: 'GALLERY/SET-ARTISTS',
  payload,
} as const);

type ActionsType = ReturnType<typeof setArtists>;

const initialState: InitialCardsStateType = {
  artists: [],
  baseURL: 'https://internship-front.framework.team',
};

export const galleryReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'GALLERY/SET-ARTISTS':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

// thunk

export const getArtistsStaticTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getArtistsStatic()
    .then((res) => {
      dispatch(setArtists({ artists: res.data }));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const getArtistsTC = (): AppThunk => (dispatch, getState: () => IAppStore) => {
  dispatch(setAppStatus({ status: 'loading' }));
  // const {
  //   accessToken,
  // } = getState().auth;
  // privateInstance.interceptors.response.use((response) => response,
  //   // eslint-disable-next-line consistent-return
  //   async (error) => {
  //     if (error.response.data.statusCode === 401) {
  //       // const newAccessToken = dispatch(refreshTC());
  //       await dispatch(refreshTC());
  //     } else return Promise.reject(error);
  //   });
  // console.log(accessToken);
  artistsAPI
    .getArtists()
    .then((res) => {
      // console.log(accessToken);
      // debugger;
      dispatch(setArtists({ artists: res.data.data }));
    })
    .catch((err) => {
      // if (err.response.data.statusCode === 401) {
      //   dispatch(refreshTC());
      // }
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};

export const getArtistPageTC = (artistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getArtistStatic(artistId)
    .then((res: any) => {
      dispatch(setArtists({ artists: res.data }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
