import { all } from '@redux-saga/core/effects';
import { watchAddFavouriteFilm } from './FavoritePageSaga';
import { watchFetchFiltered, watchFetchPopular, watchFetchProviders } from './SearchPageSaga';
import { watchFetchQuery, watchFetchQueryWithProviders } from './SearchQuerySaga';

export default function* rootSaga() {
  yield all([watchAddFavouriteFilm(), watchFetchPopular(), watchFetchFiltered(), watchFetchProviders(), watchFetchQuery(), watchFetchQueryWithProviders()]);
}
