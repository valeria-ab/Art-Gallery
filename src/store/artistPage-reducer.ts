import {
  ArtistResponseType,
  artistsAPI,
  AuthorPaintingsType,
} from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from './store';
import { setAppStatus } from './app-reducer';

export type InitialCardsStateType = {
  artistInfo: ArtistResponseType;
  artworks: Array<AuthorPaintingsType>;
};

export const setArtistInfo = (payload: { artistInfo: ArtistResponseType }) => ({
  type: 'ARTIST_PAGE/SET-ARTIST-INFO',
  payload,
} as const);
export const setArtistPaintings = (payload: { artworks: Array<AuthorPaintingsType>; }) => ({
  type: 'ARTIST_PAGE/SET-ARTIST-PAINTINGS',
  payload,
} as const);

type ActionsType =
   | ReturnType<typeof setArtistInfo>
   | ReturnType<typeof setArtistPaintings>;

const initialState: InitialCardsStateType = {
  artistInfo: {} as ArtistResponseType,
  artworks: [] as Array<AuthorPaintingsType>,
};

export const artistPageReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'ARTIST_PAGE/SET-ARTIST-INFO':
    case 'ARTIST_PAGE/SET-ARTIST-PAINTINGS':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

// thunk

export const getArtistInfoTC = (artistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getArtistStatic(artistId)
    .then((res) => {
      dispatch(setArtistInfo({ artistInfo: res.data }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};

export const getPaintingsByAuthorIdTC = (artistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getPaintingsByAuthorId(artistId)
    .then((res) => {
      dispatch(setArtistPaintings({ artworks: res.data }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
