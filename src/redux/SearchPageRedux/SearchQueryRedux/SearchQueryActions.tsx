export enum SearchQueryActionTypes {
  LOAD_SEARCH_QUERY_MOVIES = 'LOAD_SEARCH_QUERY_MOVIES',
}

export const SearchQueryActions = {
  FetchQueried: (movie: Movie[]): FetchQueried => ({
    type: SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES,
    payload: movie,
  }),
};

export interface SearchQueryStateType {
  movies: Movie[];
  query: string;
}

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

interface FetchQueried {
  type: SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES;
  payload: Movie[];
}

export type SearchQueryActionsType = FetchQueried;
