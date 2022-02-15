import { put, select, takeEvery } from '@redux-saga/core/effects';
import { getMovie, getWatchProviders } from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import { FavouritePageActions } from '../FavouritesPageRedux/FavouritePageActions';
import { RootState } from '../store';

export enum FavouritePageSagaTypes {
  ADDFAVOURITESAGA = 'ADDFAVOURITESAGA',
} // enum to init saga work
// ADDFAVOURITESAGA not registered in any reducer

interface FavouriteFilmRequest {
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

function* workerAddFavouriteFilm() {
  const storeSaga: RootState = yield select((store) => store);
  const userFilmIds = storeSaga.AuthPageReducer.user.favoriteFilms;

  for (let i = 0; i < userFilmIds.length; i += 1) {
    const watchProviders: ListOfWatchProvidersType = yield getWatchProviders(
      userFilmIds[i],
    );
    const filmRequest: FavouriteFilmRequest = yield getMovie(userFilmIds[i]);
    const favoriteFilm = {
      id: filmRequest.id,
      backdropPath: filmRequest.backdrop_path,
      genres: filmRequest.genres,
      originalLanguage: filmRequest.original_language,
      originalTitle: filmRequest.original_title,
      posterPath: filmRequest.poster_path,
      popularity: filmRequest.popularity,
      watchProviders,
      releaseDate: filmRequest.release_date,
      status: filmRequest.status,
      voteAverage: filmRequest.vote_average,
    };

    yield put(FavouritePageActions.AddFavouriteFilm(favoriteFilm));
    // ADDFAVOURITESAGA type call FavouritePageActions.AddFavouriteFilm
  }
}

export function* watchAddFavouriteFilm() {
  yield takeEvery(
    FavouritePageSagaTypes.ADDFAVOURITESAGA,
    workerAddFavouriteFilm,
  );
}
