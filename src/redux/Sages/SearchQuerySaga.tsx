import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ErrorMessage } from 'formik';
import { getMovieByQuery } from '../../Services/Service';
import { Movie } from '../SearchPageRedux/SearchPageActions';
import { SearchQueryActions } from '../SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { RootState } from '../store';

export enum SearchQuerySagaTypes {
  FETCH_QUERY_SAGA = 'FETCH_QUERY_SAGA',
}

function* workerFetchQuery() {
  const storeSaga: RootState = yield select((store) => store);
  const { query } = storeSaga.SearchQueryReducer;
  const movies: Movie[] = yield getMovieByQuery(query);
  yield put(SearchQueryActions.FetchQueried(movies));
}

export function* watchFetchPopular() {
  yield takeEvery(SearchQuerySagaTypes.FETCH_QUERY_SAGA, workerFetchQuery);
}
