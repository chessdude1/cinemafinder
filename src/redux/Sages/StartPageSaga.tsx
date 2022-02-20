import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ErrorMessage } from 'formik';
import { getMovie, getWatchProviders, getPopularMovies, getMoviesWithFilter, getWatchProvidersList } from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import { IGenre, providerFilter, watchProvider } from '../../Views/SearchPage/SearchQueryTypes';
// import { Movie, SearchPageActions, SearchPageActionTypes } from '../SearchPageRedux/SearchPageActions';
import { Movie, StartPageActions, StartPageActionTypes } from '../StartPageRedux/StartPageActions';
import { RootState } from '../store';

export enum StartPageSagaTypes {
  FETCHPOPULARSAGA = 'FETCHPOPULARSAGA',
  FETCHFILTEREDSAGA = 'FETCHFILTEREDSAGA',
  FETCHPROVIDERSSAGA = 'FETCHPROVIDERSSAGA',
}

function* workerFetchPopular() {
  const storeSaga: RootState = yield select((store) => store);
  const { pageNumber } = storeSaga.StartPageReducer;
  const popular: Movie[] = yield getPopularMovies(pageNumber);
  yield put(StartPageActions.FetchPopular(popular));
}

export function* watchFetchPopular() {
  yield takeEvery(StartPageSagaTypes.FETCHPOPULARSAGA, workerFetchPopular);
}

function* workerFetchFiltered() {
  const storeSaga: RootState = yield select((store) => store);
  const { pageNumber } = storeSaga.SearchPageReducer;
  const { genre, year, rating, providers, sortOrder } = storeSaga.SearchPageReducer.filters;
  const filtered: Movie[] = yield getMoviesWithFilter(genre, year[0], year[1], rating[0], rating[1], providers, sortOrder, pageNumber);
  yield put(StartPageActions.FetchFilteredMovies(filtered));
}

export function* watchFetchFiltered() {
  yield takeEvery(StartPageSagaTypes.FETCHFILTEREDSAGA, workerFetchFiltered);
}
