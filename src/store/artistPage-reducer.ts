import { ArtistResponseType, artistsAPI } from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from './store';
import { setAppStatus } from './app-reducer';

export type InitialCardsStateType = {
  artistInfo: ArtistResponseType;
};

export const setArtistInfo = (payload: { artistInfo: ArtistResponseType }) => ({
  type: 'ARTIST_PAGE/SET-ARTIST-INFO',
  payload,
} as const);

type ActionsType =
   | ReturnType<typeof setArtistInfo>;

const initialState: InitialCardsStateType = {
  artistInfo: {} as ArtistResponseType,
};

export const artistPageReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'ARTIST_PAGE/SET-ARTIST-INFO':
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
