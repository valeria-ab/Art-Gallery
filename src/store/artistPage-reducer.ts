import {
  AddPaintingToArtistRequestType,
  ArtistResponseType,
  artistsAPI,
  AuthorPaintingsType,
} from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from './store';
import { setAppStatus } from './app-reducer';
// eslint-disable-next-line import/no-cycle
import { getArtistsTC } from './gallery-reducer';

export type InitialCardsStateType = {
  artistInfo: ArtistResponseType;
  // paintings: Array<>
};

export const setArtistInfo = (payload: { artistInfo: ArtistResponseType }) => ({
  type: 'ARTIST_PAGE/SET-ARTIST-INFO',
  payload,
} as const);
export const addPainting = (painting: AuthorPaintingsType) => ({
  type: 'ARTIST_PAGE/ADD-PICTURE',
  painting,
} as const);
export const deletePainting = (id: string) => ({
  type: 'ARTIST_PAGE/DELETE-PICTURE',
  id,
} as const);

type ActionsType =
   | ReturnType<typeof setArtistInfo>
   | ReturnType<typeof addPainting>
   | ReturnType<typeof deletePainting>

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
    case 'ARTIST_PAGE/ADD-PICTURE': {
      const stateCopy = { ...state };
      const newPainting = action.painting;
      const { paintings } = stateCopy.artistInfo;
      const newPaintings = [...paintings, newPainting];
      stateCopy.artistInfo.paintings = newPaintings;
      return stateCopy;
    }
    case 'ARTIST_PAGE/DELETE-PICTURE': {
      const stateCopy = { ...state };
      const { paintings } = stateCopy.artistInfo;
      const newPaintings = paintings.filter((p) => p._id !== action.id);
      stateCopy.artistInfo.paintings = newPaintings;
      return stateCopy;
    }
    default:
      return state;
  }
};

// thunk

export const getArtistInfoStaticTC = (artistId: string): AppThunk => (dispatch) => {
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
export const getArtistInfoTC = (artistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getArtist(artistId)
    .then((res) => {
      dispatch(setArtistInfo({ artistInfo: res.data }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const updateMainPaintingTC = (paintingId: string, authorId: string):
    AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));

  artistsAPI
    .updateMainPainting(paintingId, authorId)
    .then((res) => {
      dispatch(getArtistsTC());
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
// AddPaintingToArtistRequestType
export const addNewPaintingTC = (artistId: string, payload: any):
    AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .addPaintingToArtist(artistId, payload)
    .then((res) => {
      dispatch(addPainting(res.data));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const deletePaintingTC = (artistId: string, paintingId: string):
    AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .deletePainting(artistId, paintingId)
    .then((res) => {
      dispatch(deletePainting(res.data));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const deleteArtistTC = (artistId: string):
    AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .deleteArtist(artistId)
    .then((res) => {
      // dispatch(deletePainting(res.data));
      debugger;
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
