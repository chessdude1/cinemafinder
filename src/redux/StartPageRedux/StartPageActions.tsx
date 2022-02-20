import { IGenre, watchProvider } from '../../Views/SearchPage/SearchQueryTypes';

export enum StartPageActionTypes {
  UPDATE_FILTERS_STATE = 'UPDATE_FILTERS_STATE',
  FETCH_FILTERED_MOVIES = 'FETCH_FILTERD_MOVIES',
  LOAD_POPULAR_SUCCESS = 'LOAD_POPULAR_SUCCESS',
  LOAD_PROVIDERS_LIST = 'LOAD_PROVIDERS_LIST',
  UPDATE_LOADING_STATUS = 'UPDATE_LOADING_STATUS',
  UPDATE_PAGE_NUMBER = 'UPDATE_PAGE_NUMBER',
  LOAD_SEARCH_QUERY_MOVIES = 'LOAD_SEARCH_QUERY_MOVIES',
}

export const StartPageActions = {
  FetchFilteredMovies: (movie: Movie[]): FetchFilteredMovies => ({
    type: StartPageActionTypes.FETCH_FILTERED_MOVIES,
    payload: movie,
  }),

  UpdateLoadingStatus: (): UpdateLoadingStatus => ({ type: StartPageActionTypes.UPDATE_LOADING_STATUS }),
  FetchPopular: (movie: Movie[]): FetchPopular => ({
    type: StartPageActionTypes.LOAD_POPULAR_SUCCESS,
    payload: movie,
  }),

  FetchQueried: (movie: Movie[]): FetchQueried => ({
    type: StartPageActionTypes.LOAD_SEARCH_QUERY_MOVIES,
    payload: movie,
  }),
};

export interface StartPageStateType {
  movies: Movie[];
  query: string;
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
  genre_ids: Array<number>;
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
  type: StartPageActionTypes.UPDATE_LOADING_STATUS;
}

interface FetchPopular {
  type: StartPageActionTypes.LOAD_POPULAR_SUCCESS;
  payload: Movie[];
}

interface FetchQueried {
  type: StartPageActionTypes.LOAD_SEARCH_QUERY_MOVIES;
  payload: Movie[];
}

interface FetchFilteredMovies {
  type: StartPageActionTypes.FETCH_FILTERED_MOVIES;
  payload: Movie[];
}

export type StartPageActionsType = UpdateLoadingStatus | FetchPopular;
