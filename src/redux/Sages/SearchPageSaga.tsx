import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ErrorMessage } from 'formik';
import {
  getMovie,
  getWatchProviders,
  getPopularMovies,
  getMoviesWithFilter,
} from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import { genre } from '../../Views/SearchPage/SearchQueryTypes';
import {
  Movie,
  SearchPageActions,
  SearchPageActionTypes,
} from '../SearchPageRedux/SearchPageActions';
import { RootState } from '../store';

export enum SearchPageSagaTypes {
  FETCHPOPULARSAGA = 'FETCHPOPULARSAGA',
  FETCHFILTEREDSAGA = 'FETCHFILTEREDSAGA',
}

interface MovieRequest {
  id: number;
  original_language: string;
  original_title: string;
  poster_path: string;
  genres: Array<{ id: number; name: string }>;
  backdrop_path: string;
  popularity: number;
  release_date: string;
  status: string;
  vote_average: number;
}

function* workerFetchPopular() {
  const popular: Movie[] = yield getPopularMovies();
  yield put(SearchPageActions.FetchPopular(popular));
}

export function* watchFetchPopular() {
  yield takeEvery(SearchPageSagaTypes.FETCHPOPULARSAGA, workerFetchPopular);
}

function* workerFetchFiltered() {
  const storeSaga: RootState = yield select((store) => store);
  const genres = storeSaga.SearchPageReducer.genre
    .map((obj) => {
      if (obj.applied === true) {
        return obj.id;
      }
      return '';
    })
    .join(',');
  const filtered: Movie[] = yield getMoviesWithFilter(genres);
  yield put(SearchPageActions.FetchFilteredMovies(filtered));
}

export function* watchFetchFiltered() {
  yield takeEvery(SearchPageSagaTypes.FETCHFILTEREDSAGA, workerFetchFiltered);
}