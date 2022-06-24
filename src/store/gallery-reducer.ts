import { ArtistResponseType, artistsAPI } from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from './store';
import { setAppStatus } from './app-reducer';

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

export const getArtistsTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getArtistsStatic()
    .then((res: any) => {
      dispatch(setArtists({ artists: res.data }));
    })
    // .catch((err) => {
    //   alert(err);
    // })
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
