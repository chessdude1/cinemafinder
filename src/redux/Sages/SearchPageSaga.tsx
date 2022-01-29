import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ErrorMessage } from 'formik';
import {
  getMovie,
  getWatchProviders,
  getPopularMovies,
} from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import {
  Movie,
  SearchPageActions,
  SearchPageActionTypes,
} from '../SearchPageRedux/SearchPageActions';
import { RootState } from '../store';

export enum SearchPageSagaTypes {
  FETCHPOPULARSAGA = 'FETCHPOPULARSAGA',
} // enum to init saga work
// ADDFAVOURITESAGA not registered in any reducer

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
