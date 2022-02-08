import { fork, put, select, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { ErrorMessage } from 'formik';
import { getMovieByQuery } from '../../Services/Service';
import { Movie } from '../SearchPageRedux/SearchPageActions';
import { SearchQueryActions } from '../SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { RootState } from '../store';
import { FavouritePageSagaTypes } from './FavoritePageSaga';
import { SearchPageSagaTypes } from './SearchPageSaga';

export enum SearchQuerySagaTypes {
  FETCH_QUERY_SAGA = 'FETCH_QUERY_SAGA',
}

function* workerFetchQuery(action: { type: SearchQuerySagaTypes; payload: string }) {
  // const storeSaga: RootState = yield select((store) => store);
  // const { query } = storeSaga.SearchQueryReducer;
  const movies: Movie[] = yield getMovieByQuery(action.payload);
  yield put(SearchQueryActions.FetchQueried(movies));
}

export function* watchFetchQuery() {
  yield takeLatest(SearchQuerySagaTypes.FETCH_QUERY_SAGA, workerFetchQuery);
}
