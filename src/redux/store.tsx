import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { FavouritesPageReducer } from './FavouritesPageRedux/FavouritesPageReducer';
import { AuthPageReducer } from './AuthPageRedux/AuthPageReducer';

const sagaMiddleware = createSagaMiddleware();
const reducers = combineReducers({
  FavouritesPageReducer,
  AuthPageReducer,
});

export const store = createStore(reducers, applyMiddleware(sagaMiddleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>
