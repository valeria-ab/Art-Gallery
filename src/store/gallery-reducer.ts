import {
  ArtistResponseType,
  artistsAPI,
  GenreResponseType,
  genresAPI
} from "../utils/api";
import { setAppError, setAppStatus } from "./app-reducer";
import { AppThunk, IAppStore } from "./store";

export type UrlParamsType = {
  name?: string;
  sortBy?: string;
  orderBy?: "asc" | "desc";
  genres?: string[];
};

export type InitialGalleryStateType = {
  artists: Array<ArtistResponseType>;
  totalArtistsCount: number;
  currentPage: number;
  portionSize: number;
  urlParams: UrlParamsType;
  genres: GenreResponseType[];
  galleryMessage: string;
};

export const setArtists = (payload: { artists: Array<ArtistResponseType> }) =>
  ({
    type: "GALLERY/SET-ARTISTS",
    payload,
  } as const);
export const setGenres = (payload: { genres: GenreResponseType[] }) =>
  ({
    type: "GALLERY/SET-GENRES",
    payload,
  } as const);
export const setTotalArtistsCount = (payload: { totalArtistsCount: number }) =>
  ({
    type: "GALLERY/SET-TOTAL-ARTISTS-COUNT",
    payload,
  } as const);

export const setCurrentPage = (payload: { currentPage: number }) =>
  ({
    type: "GALLERY/SET-CURRENT-PAGE",
    payload,
  } as const);

export const setUrlParams = (payload: { urlParams: UrlParamsType }) =>
  ({
    type: "GALLERY/SET-URL-PARAMS",
    payload,
  } as const);

export const setGalleryMessage = (payload: { galleryMessage: string }) =>
  ({
    type: "GALLERY/SET-GALLERY-MESSAGE",
    payload,
  } as const);

type ActionsType =
  | ReturnType<typeof setArtists>
  | ReturnType<typeof setTotalArtistsCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setUrlParams>
  | ReturnType<typeof setGenres>
  | ReturnType<typeof setGalleryMessage>

const initialState: InitialGalleryStateType = {
  artists: [],
  totalArtistsCount: 1000,
  currentPage: 1,
  portionSize: 6,
  urlParams: {},
  genres: [],
  galleryMessage: "",
};

export const galleryReducer = (
  state: InitialGalleryStateType = initialState,
  action: ActionsType
): InitialGalleryStateType => {
  switch (action.type) {
    case "GALLERY/SET-TOTAL-ARTISTS-COUNT":
    case "GALLERY/SET-CURRENT-PAGE":
    case "GALLERY/SET-URL-PARAMS":
    case "GALLERY/SET-GALLERY-MESSAGE":
    case "GALLERY/SET-GENRES":
      return { ...state, ...action.payload };
    case "GALLERY/SET-ARTISTS": {
      const stateCopy = { ...state };
      if (stateCopy.currentPage > 1) {
        stateCopy.artists = [...stateCopy.artists, ...action.payload.artists];
      } else {
        stateCopy.artists = [...action.payload.artists];
      }

      return stateCopy;
    }
    default:
      return state;
  }
};

// thunk

export const getArtistsStaticTC =
  (): AppThunk => (dispatch, getState: () => IAppStore) => {
    dispatch(setAppStatus({ status: "loading" }));
    const { galleryMessage } = getState().gallery;

    galleryMessage && dispatch(setGalleryMessage({ galleryMessage: "" }));
    artistsAPI
      .getArtistsStatic()
      .then((res) => {
  
        if (res.data.length === 0) {
          dispatch(
            setGalleryMessage({
              galleryMessage: "Artists not found. Please, try again.",
            })
          );
        }
        dispatch(setArtists({ artists: res.data }));
        dispatch(setTotalArtistsCount({ totalArtistsCount: res.data.length }));
      })
      .catch((error) => {
        dispatch(setAppError({ error: error.response.data.message }));
        setTimeout(() => {
          dispatch(setAppError({ error: "" }));
        }, 3000);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: "idle" }));
      });
  };
export const getArtistsTC =
  (): AppThunk => (dispatch, getState: () => IAppStore) => {
    dispatch(setAppStatus({ status: "loading" }));
    const { urlParams, galleryMessage, portionSize, currentPage } =
      getState().gallery;

    galleryMessage && dispatch(setGalleryMessage({ galleryMessage: "" }));

    artistsAPI
      .getArtists(urlParams, portionSize, currentPage)
      .then((res) => {
        if (res.data.data.length === 0) {
          dispatch(
            setGalleryMessage({
              galleryMessage: "Artists not found. Please, try again.",
            })
          );
        }

        dispatch(setArtists({ artists: res.data.data }));
        dispatch(
          setTotalArtistsCount({ totalArtistsCount: res.data.meta.count })
        );
      })
      .catch((error) => {
        dispatch(setAppError({ error: error.response.data.message }));
        setTimeout(() => {
          dispatch(setAppError({ error: "" }));
        }, 3000);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: "idle" }));
      });
  };

export const getGenresTC =
  (): AppThunk => (dispatch, getState: () => IAppStore) => {
    dispatch(setAppStatus({ status: "loading" }));
    genresAPI
      .getGenres()
      .then((res) => {
        dispatch(setGenres({ genres: res.data }));
      })
      .catch((error) => {
        dispatch(setAppError({ error: error.response.data.message }));
        setTimeout(() => {
          dispatch(setAppError({ error: "" }));
        }, 3000);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: "idle" }));
      });
  };
export const getGenresStaticTC =
  (): AppThunk => (dispatch, getState: () => IAppStore) => {
    dispatch(setAppStatus({ status: "loading" }));
    genresAPI
      .getGenresStatic()
      .then((res) => {
        dispatch(setGenres({ genres: res.data }));
      })
      .catch((error) => {
        dispatch(setAppError({ error: error.response.data.message }));
        setTimeout(() => {
          dispatch(setAppError({ error: "" }));
        }, 3000);
      })
      .finally(() => {
        dispatch(setAppStatus({ status: "idle" }));
      });
  };


