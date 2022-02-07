import { IGenre, watchProvider } from '../../Views/SearchPage/SearchQueryTypes';

export enum SearchPageActionTypes {
  UPDATE_FILTERS_STATE = 'UPDATE_FILTERS_STATE',
  FETCH_FILTERD_MOVIES = 'FETCH_FILTERD_MOVIES',
  FETCH_NEXT_PAGE_MOVIES = 'FETCH_NEXT_PAGE_MOVIES',
  FETCH_POPULAR = 'FETCH_POPULAR',
  LOAD_POPULAR_SUCCESS = 'LOAD_POPULAR_SUCCESS',
  LOAD_PROVIDERS_LIST = 'LOAD_PROVIDERS_LIST',
  LOAD_POPULAR_ERROR = 'LOAD_POPULAR_ERROR',
  UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS',
  UPDATE_PAGE_NUMBER = 'UPDATE_PAGE_NUMBER',
}

export const SearchPageActions = {
  FetchFilteredMovies: (movie: Movie[]): FetchFilteredMovies => ({
    type: SearchPageActionTypes.FETCH_FILTERD_MOVIES,
    payload: movie,
  }),
  FetchNextPageMovies: (movie: Movie[]): FetchFilteredMovies => ({
    type: SearchPageActionTypes.FETCH_NEXT_PAGE_MOVIES,
    payload: movie,
  }),
  FetchProvidersList: (providers: watchProvider[]): FetchProvidersList => ({
    type: SearchPageActionTypes.LOAD_PROVIDERS_LIST,
    payload: providers,
  }),
  UpdateFiltersState: (filters: FiltersType): UpdateFiltersState => ({
    type: SearchPageActionTypes.UPDATE_FILTERS_STATE,
    payload: filters,
  }),

  UpdateLoadingStatus: (): UpdateLoadingStatus => ({ type: SearchPageActionTypes.UPDATE_LOADING_STATUS }),
  FetchPopular: (movie: Movie[]): FetchPopular => ({
    type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS,
    payload: movie,
  }),
};

export interface SearchPageStateType {
  movies: Movie[];
  filters: FiltersType;
  providersList: watchProvider[];
  pageNumber: number;
  isLoading: boolean;
  isAllLoaded: boolean;
}

export type FiltersType = {
  genre: string;
  year: number[];
  rating: number[];

  providers: string;
  region: string;
  sortOrder: string;
};

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<{ id: number; name: string }>;
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface UpdateLoadingStatus {
  type: SearchPageActionTypes.UPDATE_LOADING_STATUS;
}
interface UpdatePageNumber {
  type: SearchPageActionTypes.UPDATE_PAGE_NUMBER;
}

interface UpdateFiltersState {
  type: SearchPageActionTypes.UPDATE_FILTERS_STATE;
  payload: FiltersType;
}

interface FetchPopular {
  type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS;
  payload: Movie[];
}

interface FetchFilteredMovies {
  type: SearchPageActionTypes.FETCH_FILTERD_MOVIES | SearchPageActionTypes.FETCH_NEXT_PAGE_MOVIES;
  payload: Movie[];
}
interface FetchProvidersList {
  type: SearchPageActionTypes.LOAD_PROVIDERS_LIST;
  payload: watchProvider[];
}

export type SearchPageActionsType = UpdatePageNumber | UpdateLoadingStatus | UpdateFiltersState | FetchPopular | FetchFilteredMovies | FetchProvidersList;
