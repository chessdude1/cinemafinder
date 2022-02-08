import { act } from 'react-dom/test-utils';
import { SearchQueryActionsType, SearchQueryActionTypes, SearchQueryStateType } from './SearchQueryActions';

const initialState: SearchQueryStateType = {
  movies: [],
  query: '',
};

export function SearchQueryReducer(state: SearchQueryStateType = initialState, action: SearchQueryActionsType) {
  switch (action.type) {
    case SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
}
