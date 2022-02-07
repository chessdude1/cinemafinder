import { act } from 'react-dom/test-utils';
import { SearchPageSagaTypes } from '../Sages/SearchPageSaga';
import { SearchPageActionTypes, SearchPageActionsType, SearchPageStateType, Movie } from './SearchPageActions';

const initialState: SearchPageStateType = {
  movies: [],
  filters: {
    genre: '',
    year: [1900, 2022],
    rating: [0, 10],

    providers: '',
    region: 'RU',
    sortOrder: 'popularity.desc',
  },
  providersList: [],
  pageNumber: 1,
  isLoading: false,
  isAllLoaded: false,
};

export function SearchPageReducer(state: SearchPageStateType = initialState, action: SearchPageActionsType) {
  switch (action.type) {
    case SearchPageActionTypes.UPDATE_FILTERS_STATE:
      return {
        ...state,
        movies: [],
        filters: action.payload,
        pageNumber: 1,
        isAllLoaded: false,
      };
    case SearchPageActionTypes.FETCH_FILTERD_MOVIES:
      return { ...state, movies: [...state.movies, ...action.payload], isLoading: false, isAllLoaded: action.payload.length < 20 };
    case SearchPageActionTypes.LOAD_POPULAR_SUCCESS:
      return { ...state, movies: [...state.movies, ...action.payload] };
    case SearchPageActionTypes.UPDATE_LOADING_STATUS:
      return { ...state, isLoading: true };
    case SearchPageActionTypes.UPDATE_PAGE_NUMBER:
      return { ...state, pageNumber: state.pageNumber + 1 };
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
