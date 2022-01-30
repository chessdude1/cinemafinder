import { all } from '@redux-saga/core/effects';
import { watchAddFavouriteFilm } from './FavoritePageSaga';
import { watchFetchFiltered, watchFetchPopular } from './SearchPageSaga';

export default function* rootSaga() {
  yield all([
    watchAddFavouriteFilm(),
    watchFetchPopular(),
    watchFetchFiltered(),
  ]);
}
