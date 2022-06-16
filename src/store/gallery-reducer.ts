import { ArtistResponseType, artistsAPI } from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from './store';

export type InitialCardsStateType = {
  isNightModeOn: boolean;
  baseURL: string;
  artists: Array<ArtistResponseType>;
};

export const setIsNightModeOn = (payload: { isNightModeOn: boolean }) => ({
  type: 'GALLERY/SET-IS-NIGHT-MODE-ON',
  payload,
} as const);
export const setArtists = (payload: { artists: Array<ArtistResponseType> }) => ({
  type: 'GALLERY/SET-ARTISTS',
  payload,
} as const);

type ActionsType =
    ReturnType<typeof setIsNightModeOn>
   | ReturnType<typeof setArtists>;

const initialState: InitialCardsStateType = {
  isNightModeOn: false,
  artists: [],
  baseURL: 'https://internship-front.framework.team',

};

export const galleryReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'GALLERY/SET-IS-NIGHT-MODE-ON':
    case 'GALLERY/SET-ARTISTS':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

// thunk

export const getArtistsTC = (): AppThunk => (dispatch) => {
  // dispatch(setLoading({ loadingStatus: 'loading' }));
  artistsAPI
    .getArtistsStatic()
    .then((res:any) => {
      dispatch(setArtists({ artists: res.data }));
    });
  // .catch((err) => {
  //   alert(err);
  // })
  // .finally(() => {
  //   dispatch(setLoading({ loadingStatus: 'idle' }));
  // });
};

export const getArtistPageTC = (artistId: string): AppThunk => (dispatch) => {
  // dispatch(setLoading({ loadingStatus: 'loading' }));
  artistsAPI
    .getArtistStatic(artistId)
    .then((res:any) => {
      dispatch(setArtists({ artists: res.data }));
    });
};
