// eslint-disable-next-line import/no-cycle
import {
  ArtistResponseType, artistsAPI, GenreResponseType, genresAPI,
} from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk, IAppStore } from './store';
import { setAppError, setAppStatus } from './app-reducer';
// eslint-disable-next-line import/no-cycle

export type UrlParamsType = {
    name?: string;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    perPage?: string;
    genres?: string[];
    pageNumber?: string;
}

export type InitialGalleryStateType = {
    artists: Array<ArtistResponseType>;
    totalPagesCount: number;
    currentPage: number;
    portionSize: number;
    currentPagesPortion: number;
    urlParams: UrlParamsType;
    genres: GenreResponseType[];
};

export const setArtists = (payload: { artists: Array<ArtistResponseType> }) => ({
  type: 'GALLERY/SET-ARTISTS',
  payload,
} as const);
export const createArtist = (artist: ArtistResponseType) => ({
  type: 'GALLERY/CREATE-ARTIST',
  artist,
} as const);
export const updateArtist = (artist: ArtistResponseType) => ({
  type: 'GALLERY/UPDATE-ARTIST',
  artist,
} as const);
export const setGenres = (payload: { genres: GenreResponseType[] }) => ({
  type: 'GALLERY/SET-GENRES',
  payload,
} as const);
export const setTotalPagesCount = (payload: { totalPagesCount: number }) => ({
  type: 'GALLERY/SET-TOTAL-PAGES-COUNT',
  payload,
} as const);

export const setCurrentPagesPortion = (payload: { currentPagesPortion: number }) => ({
  type: 'GALLERY/SET-CURRENT-PAGES-PORTION',
  payload,
} as const);

export const setUrlParams = (payload: { urlParams: UrlParamsType }) => ({
  type: 'GALLERY/SET-URL-PARAMS',
  payload,
} as const);

type ActionsType = ReturnType<typeof setArtists>
    | ReturnType<typeof createArtist>
    | ReturnType<typeof setTotalPagesCount>
    | ReturnType<typeof setCurrentPagesPortion>
    | ReturnType<typeof setUrlParams>
    | ReturnType<typeof setGenres>
    | ReturnType<typeof updateArtist>

const initialState: InitialGalleryStateType = {
  artists: [],
  totalPagesCount: 1000,
  currentPage: 1,
  portionSize: 6,
  currentPagesPortion: 1,
  urlParams: {},
  genres: [],
};

export const galleryReducer = (
  state: InitialGalleryStateType = initialState,
  action: ActionsType,
): InitialGalleryStateType => {
  switch (action.type) {
    case 'GALLERY/SET-ARTISTS':
    case 'GALLERY/SET-TOTAL-PAGES-COUNT':
    case 'GALLERY/SET-CURRENT-PAGES-PORTION':
    case 'GALLERY/SET-URL-PARAMS':
    case 'GALLERY/SET-GENRES':
      return { ...state, ...action.payload };
    case 'GALLERY/CREATE-ARTIST': {
      const stateCopy = { ...state };
      const { artists } = stateCopy;
      const newArrayArtists = [...artists, action.artist];
      stateCopy.artists = newArrayArtists;
      return stateCopy;
    }
    case 'GALLERY/UPDATE-ARTIST': {
      const stateCopy = { ...state };
      const { artists } = stateCopy;
      let updatedArtist = artists.find((artist) => artist._id === action.artist._id);
      updatedArtist = action.artist;
      const newArrayArtists = [...artists, updatedArtist];
      stateCopy.artists = newArrayArtists;
      return stateCopy;
    }
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
      dispatch(setTotalPagesCount({ totalPagesCount: res.data.length }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const getArtistsTC = (payload?: { data: URLSearchParams }): AppThunk => (
  dispatch, getState: () => IAppStore,
) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .getArtists(payload && payload)
    .then((res) => {
      dispatch(setArtists({ artists: res.data.data }));
      dispatch(setTotalPagesCount({ totalPagesCount: res.data.data.length }));
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};

export const getGenresTC = (): AppThunk => (
  dispatch, getState: () => IAppStore,
) => {
  dispatch(setAppStatus({ status: 'loading' }));
  genresAPI
    .getGenres()
    .then((res) => {
      dispatch(setGenres({ genres: res.data }));
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const getGenresStaticTC = (): AppThunk => (
  dispatch, getState: () => IAppStore,
) => {
  dispatch(setAppStatus({ status: 'loading' }));
  genresAPI
    .getGenresStatic()
    .then((res) => {
      dispatch(setGenres({ genres: res.data }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
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
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
// CreateArtistRequestType
export const createArtistTC = (payload: any):
        AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .createArtist(payload)
    .then((res) => {
      dispatch(createArtist(res.data.data));
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
export const updateArtistTC = (id: string, payload: FormData):
    AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .updateArtist(id, payload)
    .then((res) => {
      dispatch(updateArtist(res.data));
      dispatch(setAppError({ error: '' }));
    })
    .catch((error) => {
      dispatch(setAppError({ error: error.response.data.message }));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
