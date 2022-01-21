import { combineReducers, createStore } from 'redux';
import { FavouritesPageReducer } from './FavouritesPageRedux/FavouritesPageReducer';

const reducers = combineReducers({
  FavouritesPageReducer,
});

export const store = createStore(reducers);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>
