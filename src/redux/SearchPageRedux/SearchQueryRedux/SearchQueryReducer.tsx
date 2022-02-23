import { act } from 'react-dom/test-utils';
import { SearchQueryActionsType, SearchQueryActionTypes, SearchQueryStateType } from './SearchQueryActions';

const initialState: SearchQueryStateType = {
  movies: [],
  moviesWithProvider: [],
};

export function SearchQueryReducer(state: SearchQueryStateType = initialState, action: SearchQueryActionsType) {
  switch (action.type) {
    case SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    case SearchQueryActionTypes.LOAD_PAGE_QUERY_MOVIES:
      return {
        ...state,
        moviesWithProvider: [...state.moviesWithProvider, action.payload],
      };
    case SearchQueryActionTypes.CLEAN_QUERY_CONTAINER:
      return {
        ...state,
        movies: [],
      };
    case SearchQueryActionTypes.CLEAN_QUERY_PAGE:
      return {
        ...state,
        moviesWithProvider: [],
      };
    default:
      return state;
  }
}
