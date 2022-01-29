import { all } from '@redux-saga/core/effects';
import { watchAddFavouriteFilm } from './FavoritePageSaga';
import { watchFetchPopular } from './SearchPageSaga';

export default function* rootSaga() {
  yield all([watchAddFavouriteFilm(), watchFetchPopular()]);
}
