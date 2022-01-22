import { watchAddFavouriteFilm } from './FavoritePageSaga';

export default function* rootSaga() {
  yield watchAddFavouriteFilm();
}
