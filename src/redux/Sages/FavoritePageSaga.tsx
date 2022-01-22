import { put, select, takeEvery } from '@redux-saga/core/effects';
import { getMovie } from '../../Services/Service';
import { FavouriteFilm, FavouritePageActions } from '../FavouritesPageRedux/FavouritePageActions';
import { RootState } from '../store';

export enum FavouritePageSagaTypes {
  ADDFAVOURITESAGA = 'ADDFAVOURITESAGA'
} // enum to init saga work
// ADDFAVOURITESAGA not registered in any reducer

async function getUser(id : string) {
  const request = await getMovie(id);
  return request.data;
}

function* workerAddFavouriteFilm() {
  const store2 : RootState = yield select((store) => (store));
  const userFilmIds = store2.AuthPageReducer.user.favorite_films;
  for (let i = 0; i < userFilmIds.length; i += 1) {
    const data :FavouriteFilm = yield getUser(store2.AuthPageReducer.user.favorite_films[i]);
    yield put(FavouritePageActions.AddFavouriteFilm(data));
    // ADDFAVOURITESAGA type call FavouritePageActions.AddFavouriteFilm
  }
}

export function* watchAddFavouriteFilm() {
  yield takeEvery(FavouritePageSagaTypes.ADDFAVOURITESAGA, workerAddFavouriteFilm);
}
