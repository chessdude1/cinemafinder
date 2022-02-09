import { act } from 'react-dom/test-utils';
import { SearchQueryActionsType, SearchQueryActionTypes, SearchQueryStateType } from './SearchQueryActions';

const initialState: SearchQueryStateType = {
  movies: [],
  isLoading: false,
};

export function SearchQueryReducer(state: SearchQueryStateType = initialState, action: SearchQueryActionsType) {
  switch (action.type) {
    case SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES:
      return {
        ...state,
        movies: action.payload,
        isLoading: false,
      };
    case SearchQueryActionTypes.UPDATE_QUERY_LOADING_STATUS:
      return {
        ...state,
        isLoading: true,
      };
    case SearchQueryActionTypes.CLEAN_QUERY_CONTAINER:
      return {
        ...state,
        movies: [],
      };
    default:
      return state;
  }
}
