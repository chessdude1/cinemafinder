import { ListOfWatchProvidersType } from '../../../Services/ServiceTypes';
import { Movie } from '../SearchPageActions';

export enum SearchQueryActionTypes {
  LOAD_SEARCH_QUERY_MOVIES = 'LOAD_SEARCH_QUERY_MOVIES',
  LOAD_PAGE_QUERY_MOVIES = 'LOAD_PAGE_QUERY_MOVIES',
  CLEAN_QUERY_CONTAINER = 'CLEAN_QUERY_CONTAINER',
  CLEAN_QUERY_PAGE = 'CLEAN_QUERY_PAGE',
}

export const SearchQueryActions = {
  FetchQueried: (movie: Movie[]): FetchQueried => ({
    type: SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES,
    payload: movie,
  }),
  FetchQueriedWithProviders: (movie: QueriedMovie): FetchQueriedWithProviders => ({
    type: SearchQueryActionTypes.LOAD_PAGE_QUERY_MOVIES,
    payload: movie,
  }),
  CleanQueryContainer: (): CleanQuery => ({
    type: SearchQueryActionTypes.CLEAN_QUERY_CONTAINER,
  }),
  CleanQueryPage: (): CleanQuery => ({
    type: SearchQueryActionTypes.CLEAN_QUERY_PAGE,
  }),
};

export interface SearchQueryStateType {
  movies: Movie[];
  moviesWithProvider: QueriedMovie[];
}

export interface QueriedMovie {
  title: string,
  id: number;
  backdropPath: string;
  genres: number[];
  originalLanguage: string;
  originalTitle: string;
  posterPath: string;
  popularity: number;
  watchProviders: ListOfWatchProvidersType;
  releaseDate: string;
  voteAverage: number;
}

interface FetchQueried {
  type: SearchQueryActionTypes.LOAD_SEARCH_QUERY_MOVIES;
  payload: Movie[];
}

interface FetchQueriedWithProviders {
  type: SearchQueryActionTypes.LOAD_PAGE_QUERY_MOVIES;
  payload: QueriedMovie;
}
interface CleanQuery {
  type: SearchQueryActionTypes.CLEAN_QUERY_CONTAINER | SearchQueryActionTypes.CLEAN_QUERY_PAGE;
}

export type SearchQueryActionsType = FetchQueried | CleanQuery | FetchQueriedWithProviders;
