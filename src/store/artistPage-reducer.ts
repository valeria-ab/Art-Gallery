import {
  ArtistResponseType,
  artistsAPI,
  AuthorPaintingsType,
  SpecifiedPaintingByIdType,
} from "../utils/api";
import { setAppError, setAppStatus, setAppSuccessMessage } from "./app-reducer";
import { AppThunk, IAppStore } from "./store";
import { getArtistsTC, setCurrentPage } from "./gallery-reducer";
import { PageSize } from "../constants";

export type InitialCardsStateType = {
  artistInfo: ArtistResponseType;
  currentPainting: AuthorPaintingsType;
  artworksTotalPagesCount: number;
  artworksPortionSize: number;
  photoForSlider: SpecifiedPaintingByIdType;
  artworksCurrentPage: number;
};

export const setArtistInfo = (payload: { artistInfo: ArtistResponseType }) =>
  ({
    type: "ARTIST_PAGE/SET-ARTIST-INFO",
    payload,
  } as const);
export const setCurrentPainting = (payload: {
  currentPainting: AuthorPaintingsType;
}) =>
  ({
    type: "ARTIST_PAGE/SET-CURRENT-PAINTING",
    payload,
  } as const);
export const addPainting = (painting: AuthorPaintingsType) =>
  ({
    type: "ARTIST_PAGE/ADD-PICTURE",
    painting,
  } as const);

export const setArtworksTotalPagesCount = (payload: {
  artworksTotalPagesCount: number;
}) =>
  ({
    type: "ARTIST_PAGE/SET-TOTAL-PAGES-COUNT",
    payload,
  } as const);
export const setArtworksCurrentPagesPortion = (payload: {
  artworksCurrentPagesPortion: number;
}) =>
  ({
    type: "ARTIST_PAGE/SET-CURRENT-PAGES-PORTION",
    payload,
  } as const);
export const setArtworksCurrentPage = (payload: {
  artworksCurrentPage: number;
}) =>
  ({
    type: "ARTIST_PAGE/SET-CURRENT-PAGE",
    payload,
  } as const);
export const setPhotoForSlider = (payload: {
  photoForSlider: SpecifiedPaintingByIdType;
}) =>
  ({
    type: "ARTIST_PAGE/SET-PHOTO-FOR-SLIDER",
    payload,
  } as const);

type ActionsType =
  | ReturnType<typeof setArtistInfo>
  | ReturnType<typeof addPainting>
  | ReturnType<typeof setCurrentPainting>
  | ReturnType<typeof setArtworksTotalPagesCount>
  | ReturnType<typeof setArtworksCurrentPagesPortion>
  | ReturnType<typeof setArtworksCurrentPage>
  | ReturnType<typeof setPhotoForSlider>;

const initialState: InitialCardsStateType = {
  artistInfo: {} as ArtistResponseType,
  currentPainting: {} as AuthorPaintingsType,
  artworksTotalPagesCount: 100,
  artworksPortionSize: 1,
  photoForSlider: {} as SpecifiedPaintingByIdType,
  artworksCurrentPage: 1,
};

export const artistPageReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType
): InitialCardsStateType => {
  switch (action.type) {
    case "ARTIST_PAGE/SET-ARTIST-INFO":
    case "ARTIST_PAGE/SET-CURRENT-PAINTING":
    case "ARTIST_PAGE/SET-TOTAL-PAGES-COUNT":
    case "ARTIST_PAGE/SET-CURRENT-PAGES-PORTION":
    case "ARTIST_PAGE/SET-CURRENT-PAGE":
    case "ARTIST_PAGE/SET-PHOTO-FOR-SLIDER":
      return { ...state, ...action.payload };
    case "ARTIST_PAGE/ADD-PICTURE": {
      const stateCopy = { ...state };
      const newPainting = action.painting;
      const { paintings } = stateCopy.artistInfo;
      const newPaintings = [...paintings, newPainting];
      stateCopy.artistInfo.paintings = newPaintings;
      return stateCopy;
    }
    default:
      return state;
  }
};

// thunk

export const getArtistInfoStaticTC =
  (artistId: string): AppThunk =>
  (dispatch, getState: () => IAppStore) => {
    dispatch(setAppStatus({ status: "loading" }));
    const { artworksPortionSize } = getState().artistPage;
    artistsAPI
      .getArtistStatic(artistId)
      .then((res) => {
        dispatch(setArtistInfo({ artistInfo: res.data }));
        dispatch(
          setArtworksTotalPagesCount({
            artworksTotalPagesCount: Math.ceil(
              res.data.paintings.length / artworksPortionSize
            ),
          })
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
export const getArtistInfoTC =
  (artistId: string): AppThunk =>
  (dispatch, getState: () => IAppStore) => {
  
    dispatch(setAppStatus({ status: "loading" }));
    const { artworksPortionSize } = getState().artistPage;
    artistsAPI
      .getArtist(artistId)
      .then((res) => {
        dispatch(setArtistInfo({ artistInfo: res.data }));
        dispatch(
          setArtworksTotalPagesCount({
            artworksTotalPagesCount: Math.ceil(
              res.data.paintings.length / artworksPortionSize
            ),
          })
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
export const updateMainPaintingTC =
  (paintingId: string, authorId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    artistsAPI
      .updateMainPainting(paintingId, authorId)
      .then((res) => {
        dispatch(
          setAppSuccessMessage({
            successMessage: "Main painting was successfully changed",
          })
        );
        setTimeout(() => {
          dispatch(setAppSuccessMessage({ successMessage: "" }));
        }, 3000);
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

export const addNewPaintingTC =
  (artistId: string, payload: FormData): AppThunk =>
  (dispatch, getState) => {
    dispatch(setAppStatus({ status: "loading" }));
    artistsAPI
      .addPaintingToArtist(artistId, payload)
      .then((res) => {
        dispatch(addPainting(res.data));
        dispatch(
          setArtworksCurrentPage({
            artworksCurrentPage: Math.ceil(
              getState().artistPage.artistInfo.paintings.length / PageSize
            ),
          })
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
export const editPaintingTC =
  (artistId: string, paintingId: string, payload: FormData): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    artistsAPI
      .updatePainting(artistId, paintingId, payload)
      .then((res) => {
        dispatch(getArtistInfoTC(artistId));
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
export const deletePaintingTC =
  (artistId: string, paintingId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    artistsAPI
      .deletePainting(artistId, paintingId)
      .then((res) => {
        dispatch(getArtistInfoTC(artistId));
        dispatch(setArtworksCurrentPage({ artworksCurrentPage: 1 }));
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
export const deleteArtistTC =
  (artistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    artistsAPI
      .deleteArtist(artistId)
      .then((res) => {
        dispatch(setCurrentPage({ currentPage: 1 }));
        dispatch(
          setAppSuccessMessage({
            successMessage: "The artist was successfully deleted",
          })
        );
        dispatch(getArtistsTC());
        setTimeout(() => {
          dispatch(setAppSuccessMessage({ successMessage: "" }));
        }, 3000);
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

export const createArtistTC =
  (payload: FormData): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    artistsAPI
      .createArtist(payload)
      .then((res) => {
        dispatch(setCurrentPage({ currentPage: 1 }));
        dispatch(
          setAppSuccessMessage({
            successMessage: "The artist was successfully created",
          })
        );
        dispatch(getArtistsTC());
        setTimeout(() => {
          dispatch(setAppSuccessMessage({ successMessage: "" }));
        }, 3000);
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
export const updateArtistTC =
  (id: string, payload: FormData): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    artistsAPI
      .updateArtist(id, payload)
      .then((res) => {
        dispatch(getArtistInfoTC(id));
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
