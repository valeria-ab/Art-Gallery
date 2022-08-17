import {
  AddPaintingToArtistRequestType,
  ArtistResponseType,
  artistsAPI,
  AuthorPaintingsType, CreateArtistRequestType, SpecifiedPaintingByIdType,
} from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk, IAppStore } from './store';
import { setAppError, setAppStatus } from './app-reducer';
// eslint-disable-next-line import/no-cycle
import { getArtistsTC, setGenres } from './gallery-reducer';

export type InitialCardsStateType = {
    artistInfo: ArtistResponseType;
    currentPainting: AuthorPaintingsType;
    artworksTotalPagesCount: number;
    artworksPortionSize: number;
    photoForSlider: SpecifiedPaintingByIdType;

};

export const setArtistInfo = (payload: { artistInfo: ArtistResponseType }) => ({
  type: 'ARTIST_PAGE/SET-ARTIST-INFO',
  payload,
} as const);
export const setCurrentPainting = (payload: { currentPainting: AuthorPaintingsType }) => ({
  type: 'ARTIST_PAGE/SET-CURRENT-PAINTING',
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
export const setArtworksTotalPagesCount = (payload: { artworksTotalPagesCount: number }) => ({
  type: 'ARTIST_PAGE/SET-TOTAL-PAGES-COUNT',
  payload,
} as const);
export const setArtworksCurrentPagesPortion = (payload: {
  artworksCurrentPagesPortion: number }) => ({
  type: 'ARTIST_PAGE/SET-CURRENT-PAGES-PORTION',
  payload,
} as const);
export const setArtworksCurrentPage = (payload: { artworksCurrentPage: number }) => ({
  type: 'ARTIST_PAGE/SET-CURRENT-PAGE',
  payload,
} as const);
export const setPhotoForSlider = (payload: { photoForSlider: SpecifiedPaintingByIdType }) => ({
  type: 'ARTIST_PAGE/SET-PHOTO-FOR-SLIDER',
  payload,
} as const);

type ActionsType =
    | ReturnType<typeof setArtistInfo>
    | ReturnType<typeof addPainting>
    | ReturnType<typeof deletePainting>
    | ReturnType<typeof setCurrentPainting>
    | ReturnType<typeof setArtworksTotalPagesCount>
    | ReturnType<typeof setArtworksCurrentPagesPortion>
    | ReturnType<typeof setArtworksCurrentPage>
    | ReturnType<typeof setPhotoForSlider>

const initialState: InitialCardsStateType = {
  artistInfo: {} as ArtistResponseType,
  currentPainting: {} as AuthorPaintingsType,
  artworksTotalPagesCount: 100,
  artworksPortionSize: 1,
  photoForSlider: {} as SpecifiedPaintingByIdType,
};

export const artistPageReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'ARTIST_PAGE/SET-ARTIST-INFO':
    case 'ARTIST_PAGE/SET-CURRENT-PAINTING':
    case 'ARTIST_PAGE/SET-TOTAL-PAGES-COUNT':
    case 'ARTIST_PAGE/SET-CURRENT-PAGES-PORTION':
    case 'ARTIST_PAGE/SET-CURRENT-PAGE':
    case 'ARTIST_PAGE/SET-PHOTO-FOR-SLIDER':
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

export const getArtistInfoStaticTC = (artistId: string): AppThunk => (dispatch,
  getState: () => IAppStore) => {
  dispatch(setAppStatus({ status: 'loading' }));
  const { artworksPortionSize } = getState().artistPage;
  artistsAPI
    .getArtistStatic(artistId)
    .then((res) => {
      dispatch(setArtistInfo({ artistInfo: res.data }));
      dispatch(setArtworksTotalPagesCount({
        artworksTotalPagesCount: Math.ceil(
          res.data.paintings.length / artworksPortionSize,
        ),
      }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const getArtistInfoTC = (artistId: string): AppThunk => (dispatch,
  getState: () => IAppStore) => {
  dispatch(setAppStatus({ status: 'loading' }));
  const { artworksPortionSize } = getState().artistPage;
  artistsAPI
    .getArtist(artistId)
    .then((res) => {
      dispatch(setAppError({ error: '' }));
      dispatch(setArtistInfo({ artistInfo: res.data }));
      dispatch(setArtworksTotalPagesCount({
        artworksTotalPagesCount: Math.ceil(
          res.data.paintings.length / artworksPortionSize,
        ),
      }));
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
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
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
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
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const editPaintingTC = (artistId: string, paintingId: string, payload: any):
    AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .updatePainting(artistId, paintingId, payload)
    .then((res) => {
      // dispatch(addPainting(res.data));
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
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
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
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
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};

export const getPaintingTC = (authorId: string, paintingId: string):
    AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getSpecifiedPaintingById(paintingId, authorId)
    .then((res) => {
      console.log(res.data.image);
      dispatch(setPhotoForSlider({ photoForSlider: res.data }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
