import { act } from 'react-dom/test-utils';
import { SearchPageSagaTypes } from '../Sages/SearchPageSaga';
import {
  SearchPageActionTypes,
  SearchPageActionsType,
  SearchPageStateType,
  Movie,
} from './SearchPageActions';

const initialState: SearchPageStateType = {
  movies: [],
  genre: [
    { id: 28, name: 'Action', applied: false },
    { id: 12, name: 'Adventure', applied: false },
    { id: 16, name: 'Animation', applied: false },
    { id: 35, name: 'Comedy', applied: false },
    { id: 80, name: 'Crime', applied: false },
    { id: 99, name: 'Documentary', applied: false },
    { id: 18, name: 'Drama', applied: false },
    { id: 10751, name: 'Family', applied: false },
    { id: 14, name: 'Fantasy', applied: false },
    { id: 36, name: 'History', applied: false },
    { id: 27, name: 'Horror', applied: false },
    { id: 10402, name: 'Music', applied: false },
    { id: 9648, name: 'Mystery', applied: false },
    { id: 10749, name: 'Romance', applied: false },
    { id: 878, name: 'Science Fiction', applied: false },
    { id: 10770, name: 'TV Movie', applied: false },
    { id: 53, name: 'Thriller', applied: false },
    { id: 10752, name: 'War', applied: false },
    { id: 37, name: 'Western', applied: false },
  ],
  year: [1900, 2022],
  rating: [0, 10],
};

export function SearchPageReducer(
  state: SearchPageStateType = initialState,
  action: SearchPageActionsType,
) {
  switch (action.type) {
    case SearchPageActionTypes.UPDATE_GENRES_FILTER:
      return {
        ...state,
        genre: action.payload,
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
    case SearchPageActionTypes.FETCH_FILTERD_MOVIES:
      return { ...state, movies: action.payload };
    case SearchPageActionTypes.LOAD_POPULAR_SUCCESS:
      return { ...state, movies: action.payload };
    default:
      return state;
  }
}
