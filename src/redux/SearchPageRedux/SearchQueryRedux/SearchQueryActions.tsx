export enum SearchQueryActionTypes {
  LOAD_SEARCH_QUERY_MOVIES = 'LOAD_SEARCH_QUERY_MOVIES',
  CLEAN_QUERY_CONTAINER = 'CLEAN_QUERY_CONTAINER',
  UPDATE_QUERY_LOADING_STATUS = 'UPDATE_QUERY_LOADING_STATUS',
}

export const SearchQueryActions = {
  FetchQueried: (movie: Movie[]): FetchQueried => ({
    type: SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES,
    payload: movie,
  }),
  UpdateLoadingStatus: (): UpdateLoadingStatus => ({
    type: SearchQueryActionTypes.UPDATE_QUERY_LOADING_STATUS,
  }),
  CleanQueryContainer: (): CleanQuery => ({
    type: SearchQueryActionTypes.CLEAN_QUERY_CONTAINER,
  }),
};

export interface SearchQueryStateType {
  movies: Movie[];
  isLoading: boolean;
}

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

interface FetchQueried {
  type: SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES;
  payload: Movie[];
}

interface CleanQuery {
  type: SearchQueryActionTypes.CLEAN_QUERY_CONTAINER;
}
interface UpdateLoadingStatus {
  type: SearchQueryActionTypes.UPDATE_QUERY_LOADING_STATUS;
}

export type SearchQueryActionsType = FetchQueried | CleanQuery | UpdateLoadingStatus;
