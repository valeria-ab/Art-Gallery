import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
// eslint-disable-next-line import/no-cycle
import { artistPageReducer } from './artistPage-reducer';
// eslint-disable-next-line import/no-cycle
import { galleryReducer } from './gallery-reducer';

const reducers = combineReducers({
  gallery: galleryReducer,
  artistPage: artistPageReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type IAppStore = ReturnType<typeof reducers>;
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
