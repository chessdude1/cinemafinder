import { act } from 'react-dom/test-utils';
import { INIT_RATING_STATE, INIT_REGION, INIT_SORT_ORDER, INIT_YEARS_STATE, ITEMS_ON_PAGE } from '../../Views/SearchPage/Filters/InitialStates';
import { SearchPageSagaTypes } from '../Sages/SearchPageSaga';
import { SearchPageActionTypes, SearchPageActionsType, SearchPageStateType, Movie } from './SearchPageActions';

const initialState: SearchPageStateType = {
  movies: [],
  query: '',
  filters: {
    genre: '',
    year: INIT_YEARS_STATE,
    rating: INIT_RATING_STATE,
    providers: '',
    region: INIT_REGION,
    sortOrder: INIT_SORT_ORDER,
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
    case SearchPageActionTypes.FETCH_FILTERED_MOVIES:
      return { ...state, movies: [...state.movies, ...action.payload], isLoading: false, isAllLoaded: action.payload.length < ITEMS_ON_PAGE };
    case SearchPageActionTypes.LOAD_POPULAR_SUCCESS:
      return { ...state, movies: [...state.movies, ...action.payload], isLoading: false, isAllLoaded: action.payload.length < ITEMS_ON_PAGE };
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
