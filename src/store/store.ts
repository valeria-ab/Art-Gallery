import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {galleryReducer} from './gallery-reducer';


const reducers = combineReducers({
    gallery: galleryReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

export type IAppStore = ReturnType<typeof reducers>;