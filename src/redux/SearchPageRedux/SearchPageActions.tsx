import { IGenre, watchProvider } from '../../Views/SearchPage/SearchQueryTypes';

export enum SearchPageActionTypes {
  UPDATE_GENRES_FILTER = 'UPDATE_GENRES_FILTER',
  UPDATE_YEARS_FILTER = 'UPDATE_YEARS_FILTER',
  UPDATE_RATING_FILTER = 'UPDATE_RATING_FILTER',
  UPDATE_PROVIDERS_FILTER = 'UPDATE_PROVIDERS_FILTER',
  UPDATE_SORT_ORDER = 'UPDATE_SORT_ORDER',

  FETCH_FILTERD_MOVIES = 'FETCH_FILTERD_MOVIES',
  FETCH_NEXT_PAGE_MOVIES = 'FETCH_NEXT_PAGE_MOVIES',
  FETCH_POPULAR = 'FETCH_POPULAR',
  LOAD_POPULAR_SUCCESS = 'LOAD_POPULAR_SUCCESS',
  LOAD_PROVIDERS_LIST = 'LOAD_PROVIDERS_LIST',
  LOAD_POPULAR_ERROR = 'LOAD_POPULAR_ERROR',
  CHANGE_LOADING_STATUS = 'CHANGE_LOADING_STATUS',
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
  UpdateGenresFilter: (filter: string): UpdateGenresFilter => ({
    type: SearchPageActionTypes.UPDATE_GENRES_FILTER,
    payload: filter,
  }),
  UpdateYearsFilter: (filter: number[]): UpdateYearsFilter => ({
    type: SearchPageActionTypes.UPDATE_YEARS_FILTER,
    payload: filter,
  }),
  UpdateRatingFilter: (filter: number[]): UpdateRatingFilter => ({
    type: SearchPageActionTypes.UPDATE_RATING_FILTER,
    payload: filter,
  }),
  UpdateProvidersFilter: (filter: string): UpdateProvidersFilter => ({
    type: SearchPageActionTypes.UPDATE_PROVIDERS_FILTER,
    payload: filter,
  }),
  UpdateSortOrder: (filter: string): UpdateSortOrder => ({
    type: SearchPageActionTypes.UPDATE_SORT_ORDER,
    payload: filter,
  }),
  UpdateLoadingStatus: (): UpdateLoadingStatus => ({ type: SearchPageActionTypes.CHANGE_LOADING_STATUS }),
  FetchPopular: (movie: Movie[]): FetchPopular => ({
    type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS,
    payload: movie,
  }),
};

export interface SearchPageStateType {
  movies: Movie[];
  genre: string;
  year: number[];
  rating: number[];
  providersList: watchProvider[];
  providers: string;
  region: string;
  sortOrder: string;
  pageNumber: number;
  isLoading: boolean;
  isAllLoaded: boolean;
}

export type Filters = {
  genre: IGenre[];
  year: number[];
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
  type: SearchPageActionTypes.CHANGE_LOADING_STATUS;
}

interface UpdateSortOrder {
  type: SearchPageActionTypes.UPDATE_SORT_ORDER;
  payload: string;
}
interface UpdateGenresFilter {
  type: SearchPageActionTypes.UPDATE_GENRES_FILTER;
  payload: string;
}
interface UpdateYearsFilter {
  type: SearchPageActionTypes.UPDATE_YEARS_FILTER;
  payload: number[];
}
interface UpdateRatingFilter {
  type: SearchPageActionTypes.UPDATE_RATING_FILTER;
  payload: number[];
}
interface UpdateProvidersFilter {
  type: SearchPageActionTypes.UPDATE_PROVIDERS_FILTER;
  payload: string;
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

export type SearchPageActionsType =
  | UpdateLoadingStatus
  | UpdateGenresFilter
  | FetchPopular
  | FetchFilteredMovies
  | UpdateYearsFilter
  | UpdateRatingFilter
  | FetchProvidersList
  | UpdateProvidersFilter
  | UpdateSortOrder;
