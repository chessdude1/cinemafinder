import { combineReducers, createStore } from "redux";
import { FavouritesPageReducer } from "./FavouritesPageRedux/FavouritesPageReducer";
let reducers = combineReducers({
  FavouritesPage: FavouritesPageReducer,
});

const store = createStore(reducers);
