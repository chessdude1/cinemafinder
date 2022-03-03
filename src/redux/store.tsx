import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { FavouritesPageReducer } from './FavouritesPageRedux/FavouritesPageReducer';
import { AuthPageReducer } from './AuthPageRedux/AuthPageReducer';
import { SearchPageReducer } from './SearchPageRedux/SearchPageReducer';
import rootSaga from './Sages/rootSaga';
import { SearchQueryReducer } from './SearchPageRedux/SearchQueryRedux/SearchQueryReducer';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  FavouritesPageReducer,
  AuthPageReducer,
  SearchPageReducer,
  SearchQueryReducer,
});

export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
