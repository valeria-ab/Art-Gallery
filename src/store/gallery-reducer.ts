// eslint-disable-next-line import/no-cycle
import { ArtistResponseType, artistsAPI } from '../utils/api';
// eslint-disable-next-line import/no-cycle
import { AppThunk, IAppStore } from './store';
import { setAppStatus } from './app-reducer';
// eslint-disable-next-line import/no-cycle

export type InitialCardsStateType = {
  baseURL: string;
  artists: Array<ArtistResponseType>;
  totalPagesCount: number;
  currentPage: number;
  portionSize: number;
  currentPagesPortion: number;
};

export const setArtists = (payload: { artists: Array<ArtistResponseType> }) => ({
  type: 'GALLERY/SET-ARTISTS',
  payload,
} as const);
export const createArtist = (artist: ArtistResponseType) => ({
  type: 'GALLERY/CREATE-ARTISTS',
  artist,
} as const);
export const setTotalPagesCount = (payload: {totalPagesCount: number}) => ({
  type: 'GALLERY/SET-TOTAL-PAGES-COUNT',
  payload,
} as const);
const setPagesPortion = (payload: {pagesPortion: number}) => ({
  type: 'GALLERY/SET-CURRENT-PAGE',
  payload,
} as const);
export const setCurrentPagesPortion = (payload: {currentPagesPortion: number}) => ({
  type: 'GALLERY/SET-CURRENT-PAGES-PORTION',
  payload,
} as const);

type ActionsType = ReturnType<typeof setArtists>
    | ReturnType<typeof createArtist>
    | ReturnType<typeof setTotalPagesCount>
    | ReturnType<typeof setCurrentPagesPortion>

const initialState: InitialCardsStateType = {
  artists: [],
  baseURL: 'https://internship-front.framework.team',
  totalPagesCount: 1000,
  currentPage: 1,
  portionSize: 9,
  currentPagesPortion: 1,
};

export const galleryReducer = (
  state: InitialCardsStateType = initialState,
  action: ActionsType,
): InitialCardsStateType => {
  switch (action.type) {
    case 'GALLERY/SET-ARTISTS':
    case 'GALLERY/SET-TOTAL-PAGES-COUNT':
    case 'GALLERY/SET-CURRENT-PAGES-PORTION':
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
export const getArtistsTC = (): AppThunk => (dispatch, getState: () => IAppStore) => {
  dispatch(setAppStatus({ status: 'loading' }));
  // const {
  //   accessToken,
  // } = getState().auth;
  // privateInstance.interceptors.response.use((response) => response,
  //   // eslint-disable-next-line consistent-return
  //   async (error) => {
  //     if (error.response.data.statusCode === 401) {
  //       // const newAccessToken = dispatch(refreshTC());
  //       await dispatch(refreshTC());
  //     } else return Promise.reject(error);
  //   });
  // console.log(accessToken);
  artistsAPI
    .getArtists()
    .then((res) => {
      // console.log(accessToken);
      // debugger;
      dispatch(setArtists({ artists: res.data.data }));
      dispatch(setTotalPagesCount({ totalPagesCount: res.data.data.length }));
    })
    .catch((err) => {
      // if (err.response.data.statusCode === 401) {
      //   dispatch(refreshTC());
      // }
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
