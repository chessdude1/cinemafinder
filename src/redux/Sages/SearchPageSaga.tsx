import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ErrorMessage } from 'formik';
import { getMovie, getWatchProviders, getPopularMovies, getMoviesWithFilter, getWatchProvidersList } from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import { genre, providerFilter, watchProvider } from '../../Views/SearchPage/SearchQueryTypes';
import { Movie, SearchPageActions, SearchPageActionTypes } from '../SearchPageRedux/SearchPageActions';
import { RootState } from '../store';

export enum SearchPageSagaTypes {
  FETCHPOPULARSAGA = 'FETCHPOPULARSAGA',
  FETCHFILTEREDSAGA = 'FETCHFILTEREDSAGA',
  FETCHPROVIDERSSAGA = 'FETCHPROVIDERSSAGA',
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

function* workerFetchProviders() {
  const list: watchProvider[] = yield getWatchProvidersList();
  yield put(SearchPageActions.FetchProvidersList(list));
  const p: providerFilter[] = [];
  list.forEach((item) => p.push({ id: item.provider_id, isApplied: false }));
  console.log(p);
  // yield put(SearchPageActions.UpdateProvidersFilter(p));
}

export function* watchFetchProviders() {
  yield takeEvery(SearchPageSagaTypes.FETCHPROVIDERSSAGA, workerFetchProviders);
}

function* workerFetchFiltered() {
  const storeSaga: RootState = yield select((store) => store);
  const genres = storeSaga.SearchPageReducer.genre
    .map((obj) => {
      if (obj.applied === true) {
        return obj.id;
      }
      return null;
    })
    .filter((obj) => obj !== null)
    .join(',');
  const years = storeSaga.SearchPageReducer.year;
  const rating = storeSaga.SearchPageReducer.rating;
  const providers = storeSaga.SearchPageReducer.providers
    .map((item) => (item.isApplied ? item.id : null))
    .filter((obj) => obj !== null)
    .join(',');
  const sortOrder = storeSaga.SearchPageReducer.sortOrder;
  const filtered: Movie[] = yield getMoviesWithFilter(genres, years[0], years[1], rating[0], rating[1], providers, sortOrder);
  yield put(SearchPageActions.FetchFilteredMovies(filtered));
}

export function* watchFetchFiltered() {
  yield takeEvery(SearchPageSagaTypes.FETCHFILTEREDSAGA, workerFetchFiltered);
}
