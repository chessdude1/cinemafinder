import { fork, put, select, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { getMovieByQuery } from '../../Services/Service';
import { Movie } from '../SearchPageRedux/SearchPageActions';
import { SearchQueryActions } from '../SearchPageRedux/SearchQueryRedux/SearchQueryActions';

export enum SearchQuerySagaTypes {
  FETCH_QUERY_SAGA = 'FETCH_QUERY_SAGA',
}

function* workerFetchQuery(action: { type: SearchQuerySagaTypes; payload: string }) {
  const movies: Movie[] = yield getMovieByQuery(action.payload);
  yield put(SearchQueryActions.FetchQueried(movies));
}

export function* watchFetchQuery() {
  yield takeLatest(SearchQuerySagaTypes.FETCH_QUERY_SAGA, workerFetchQuery);
}
