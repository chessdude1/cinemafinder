export enum SearchPageActionTypes {
  FILTER = 'FILTER',
  FETCH_POPULAR = 'FETCH_POPULAR',
}

export const SearchPageActions = {
  FilterByGenres: (movie: Movie): FilterByGenres => ({
    type: SearchPageActionTypes.FILTER,
    payload: movie,
  }),
  FetchPopular: (movie: Movie): FetchPopular => ({
    type: SearchPageActionTypes.FETCH_POPULAR,
    payload: movie,
  }),
};

export interface SearchPageStateType {
  movies: Array<Movie>;
}

export interface Movie {
  id: number;
  originalLanguage: string;
  originalTitle: string;
  posterPath: string;
  genres: Array<{ id: number; name: string }>;
  backdropPath: string;
  popularity: number;
  status: string;
  releaseDate: string;
  voteAverage: number;
}

interface FilterByGenres {
  type: SearchPageActionTypes.FILTER;
  payload: Movie;
}

interface FetchPopular {
  type: SearchPageActionTypes.FETCH_POPULAR;
  payload: Movie;
}

export type SearchPageActionsType = FilterByGenres | FetchPopular;
