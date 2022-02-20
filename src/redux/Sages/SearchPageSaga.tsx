import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ErrorMessage } from 'formik';
import { getMovie, getWatchProviders, getPopularMovies, getMoviesWithFilter, getWatchProvidersList } from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import { IGenre, providerFilter, watchProvider } from '../../Views/SearchPage/SearchQueryTypes';
import { currentLanguage } from '../AuthPageRedux/AuthPageReducer';
import { Movie, SearchPageActions, SearchPageActionTypes } from '../SearchPageRedux/SearchPageActions';
import { RootState } from '../store';

export enum SearchPageSagaTypes {
  FETCHPOPULARSAGA = 'FETCHPOPULARSAGA',
  FETCHFILTEREDSAGA = 'FETCHFILTEREDSAGA',
  FETCHPROVIDERSSAGA = 'FETCHPROVIDERSSAGA',
}

function* workerFetchPopular() {
  const storeSaga: RootState = yield select((store) => store);
  const { pageNumber } = storeSaga.SearchPageReducer;
  const popular: Movie[] = yield getPopularMovies(pageNumber, 'week', currentLanguage);
  yield put(SearchPageActions.FetchPopular(popular));
}

export function* watchFetchPopular() {
  yield takeEvery(SearchPageSagaTypes.FETCHPOPULARSAGA, workerFetchPopular);
}

function* workerFetchProviders() {
  const list: watchProvider[] = yield getWatchProvidersList();
  yield put(SearchPageActions.FetchProvidersList(list));
}

export function* watchFetchProviders() {
  yield takeEvery(SearchPageSagaTypes.FETCHPROVIDERSSAGA, workerFetchProviders);
}

function* workerFetchFiltered() {
  const storeSaga: RootState = yield select((store) => store);
  const { pageNumber } = storeSaga.SearchPageReducer;
  const { genre, year, rating, providers, sortOrder } = storeSaga.SearchPageReducer.filters;
  const filtered: Movie[] = yield getMoviesWithFilter(genre, year[0], year[1], rating[0], rating[1], providers, sortOrder, pageNumber, currentLanguage, currentLanguage);
  yield put(SearchPageActions.FetchFilteredMovies(filtered));
}

export function* watchFetchFiltered() {
  yield takeEvery(SearchPageSagaTypes.FETCHFILTEREDSAGA, workerFetchFiltered);
}
