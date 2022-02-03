import { act } from 'react-dom/test-utils';
import { SearchPageSagaTypes } from '../Sages/SearchPageSaga';
import { SearchPageActionTypes, SearchPageActionsType, SearchPageStateType, Movie } from './SearchPageActions';

const initialState: SearchPageStateType = {
  movies: [],
  genre: '',
  year: [1900, 2022],
  rating: [0, 10],
  providersList: [],
  providers: '',
  region: 'RU',
  sortOrder: 'popularity.desc',
};

export function SearchPageReducer(state: SearchPageStateType = initialState, action: SearchPageActionsType) {
  switch (action.type) {
    case SearchPageActionTypes.UPDATE_GENRES_FILTER:
      return {
        ...state,
        genre: action.payload,
      };
    case SearchPageActionTypes.UPDATE_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
    case SearchPageActionTypes.UPDATE_YEARS_FILTER:
      return {
        ...state,
        year: action.payload,
      };
    case SearchPageActionTypes.UPDATE_RATING_FILTER:
      return {
        ...state,
        rating: action.payload,
      };
    case SearchPageActionTypes.UPDATE_PROVIDERS_FILTER:
      return {
        ...state,
        providers: action.payload,
      };
    case SearchPageActionTypes.FETCH_FILTERD_MOVIES:
      return { ...state, movies: action.payload };
    case SearchPageActionTypes.LOAD_POPULAR_SUCCESS:
      return { ...state, movies: action.payload };
    case SearchPageActionTypes.LOAD_PROVIDERS_LIST: {
      return {
        ...state,
        providersList: action.payload,
      };
    }
    default:
      return state;
  }
}
