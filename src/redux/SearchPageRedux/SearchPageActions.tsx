export enum SearchPageActionTypes {
  FILTER = 'FILTER',
  FETCH_POPULAR = 'FETCH_POPULAR',
  LOAD_POPULAR_SUCCESS = 'LOAD_POPULAR_SUCCESS',
  LOAD_POPULAR_ERROR = 'LOAD_POPULAR_ERROR',
}

export const SearchPageActions = {
  FilterByGenres: (movie: Movie[]): FilterByGenres => ({
    type: SearchPageActionTypes.FILTER,
    payload: movie,
  }),
  FetchPopular: (movie: Movie[]): FetchPopular => ({
    type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS,
    payload: movie,
  }),
};

export interface SearchPageStateType {
  movies: Movie[];
  filters: Filters[];
}

export type Filters = {
  genre: string;
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

interface FilterByGenres {
  type: SearchPageActionTypes.FILTER;
  payload: Movie[];
}

interface FetchPopular {
  type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS;
  payload: Movie[];
}

interface LoadedPopular {
  type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS;
  payload: Movie[];
}
// interface LoadedError {
//   type: SearchPageActionTypes.LOAD_POPULAR_ERROR;
//   payload: Movie;
// }

export type SearchPageActionsType =
  | FilterByGenres
  | FetchPopular
  | LoadedPopular;
