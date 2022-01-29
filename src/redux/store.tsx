import {
  applyMiddleware, combineReducers, createStore, compose,
} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { FavouritesPageReducer } from './FavouritesPageRedux/FavouritesPageReducer';
import { AuthPageReducer } from './AuthPageRedux/AuthPageReducer';
import rootSaga from './Sages/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  FavouritesPageReducer,
  AuthPageReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>
