import { SearchPageSagaTypes } from '../Sages/SearchPageSaga';
import {
  SearchPageActionTypes,
  SearchPageActionsType,
  SearchPageStateType,
  Movie,
} from './SearchPageActions';

const initialState: SearchPageStateType = {
  movies: [],
};

export function SearchPageReducer(
  state: SearchPageStateType = initialState,
  action: SearchPageActionsType,
) {
  switch (action.type) {
    case SearchPageActionTypes.FILTER:
      return { ...state, movies: [...state.movies, ...action.payload] };
    // case SearchPageActionTypes.FETCH_POPULAR:
    //   return { ...state, movies: [...state.movies, action.payload] };
    case SearchPageActionTypes.LOAD_POPULAR_SUCCESS:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
}
