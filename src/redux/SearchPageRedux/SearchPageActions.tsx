import {
  genre,
  genreFilter,
  yearFilter,
} from '../../Views/SearchPage/SearchQueryTypes';

export enum SearchPageActionTypes {
  UPDATE_GENRES_FILTER = 'UPDATE_GENRES_FILTER',
  FETCH_FILTERD_MOVIES = 'FETCH_FILTERD_MOVIES',
  FETCH_POPULAR = 'FETCH_POPULAR',
  LOAD_POPULAR_SUCCESS = 'LOAD_POPULAR_SUCCESS',
  LOAD_POPULAR_ERROR = 'LOAD_POPULAR_ERROR',
}

export const SearchPageActions = {
  FetchFilteredMovies: (movie: Movie[]): FetchFilteredMovies => ({
    type: SearchPageActionTypes.FETCH_FILTERD_MOVIES,
    payload: movie,
  }),
  UpdateGenresFilter: (filter: genre[]): UpdateGenresFilter => ({
    type: SearchPageActionTypes.UPDATE_GENRES_FILTER,
    payload: filter,
  }),
  FetchPopular: (movie: Movie[]): FetchPopular => ({
    type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS,
    payload: movie,
  }),
};

export interface SearchPageStateType {
  movies: Movie[];
  genre: genre[];
  year: yearFilter;
}

export type Filters = {
  genre: genre[];
  year: yearFilter;
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

interface UpdateGenresFilter {
  type: SearchPageActionTypes.UPDATE_GENRES_FILTER;
  payload: genre[];
}

interface FetchPopular {
  type: SearchPageActionTypes.LOAD_POPULAR_SUCCESS;
  payload: Movie[];
}

interface FetchFilteredMovies {
  type: SearchPageActionTypes.FETCH_FILTERD_MOVIES;
  payload: Movie[];
}
// interface LoadedError {
//   type: SearchPageActionTypes.LOAD_POPULAR_ERROR;
//   payload: Movie;
// }

export type SearchPageActionsType =
  | UpdateGenresFilter
  | FetchPopular
  | FetchFilteredMovies;
