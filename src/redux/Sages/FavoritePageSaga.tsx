import { put, select, takeEvery } from '@redux-saga/core/effects';
import { getMovie, getWatchProviders } from '../../Services/Service';
import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';
import { currentLanguage } from '../AuthPageRedux/AuthPageReducer';
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
  titleTranslated ?: string;
  overviewTranslated?: string
}

function* workerAddFavouriteFilm() {
  const storeSaga: RootState = yield select((store) => store);
  const userFilmIds = storeSaga.AuthPageReducer.user.favoriteFilms;
  const favouriteFilms = [];
  for (let i = 0; i < userFilmIds.length; i += 1) {
    const watchProviders: ListOfWatchProvidersType = yield getWatchProviders(
      userFilmIds[i],
    );
    const filmRequest: FavouriteFilmRequest = yield getMovie(userFilmIds[i], currentLanguage);
    const favoriteFilm = {
      titleTranslated: filmRequest.titleTranslated,
      overviewTranslated: filmRequest.overviewTranslated,
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
    favouriteFilms.push(favoriteFilm);
  }
  yield put(FavouritePageActions.AddFavouriteFilm(favouriteFilms));
  // ADDFAVOURITESAGA type call FavouritePageActions.AddFavouriteFilm
}

export function* watchAddFavouriteFilm() {
  yield takeEvery(
    FavouritePageSagaTypes.ADDFAVOURITESAGA,
    workerAddFavouriteFilm,
  );
}
