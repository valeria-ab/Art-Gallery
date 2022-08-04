// eslint-disable-next-line import/no-cycle
import {
  ArtistResponseType, artistsAPI, GenreResponseType, genresAPI,
} from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk, IAppStore } from './store';
import { setAppStatus } from './app-reducer';
// eslint-disable-next-line import/no-cycle

export type UrlParamsType = {
    name?: string;
    sortBy?: string;
    orderBy?: 'asc' | 'desc';
    perPage?: string;
    genres?: string;
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
  type: 'GALLERY/CREATE-ARTISTS',
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

const initialState: InitialGalleryStateType = {
  artists: [],
  totalPagesCount: 1000,
  currentPage: 1,
  portionSize: 9,
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
    case 'GALLERY/CREATE-ARTISTS': {
      const stateCopy = { ...state };
      const { artists } = stateCopy;
      const newArrayArtists = [...artists, action.artist];
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
    .catch((err) => {
      console.log(err);
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
    })
    .catch((err) => {
      console.log(err);
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
    })
    .catch((err) => {
      console.log(err);
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
// CreateArtistRequestType
export const createArtistTC = (payload: any):
        AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: 'loading' }));
  artistsAPI
    .createArtist(payload)
    .then((res) => {
      dispatch(createArtist(res.data.data));
    })
    .finally(() => {
      dispatch(setAppStatus({ status: 'idle' }));
    });
};
