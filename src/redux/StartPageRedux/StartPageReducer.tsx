import { act } from 'react-dom/test-utils';
import { INIT_RATING_STATE, INIT_REGION, INIT_SORT_ORDER, INIT_YEARS_STATE, ITEMS_ON_PAGE } from '../../Views/SearchPage/Filters/InitialStates';
import { StartPageSagaTypes } from '../Sages/StartPageSaga';
import { StartPageActionTypes, StartPageActionsType, StartPageStateType, Movie } from './StartPageActions';

const initialState: StartPageStateType = {
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

export function StartPageReducer(state: StartPageStateType = initialState, action: StartPageActionsType): typeof initialState {
  switch (action.type) {
    case StartPageActionTypes.LOAD_POPULAR_SUCCESS:
      return { ...state, movies: [...action.payload], isLoading: false, isAllLoaded: action.payload.length < ITEMS_ON_PAGE };
    case StartPageActionTypes.UPDATE_LOADING_STATUS:
      return { ...state, isLoading: true };
    default:
      return state;
  }
}
