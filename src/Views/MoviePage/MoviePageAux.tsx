import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MoviePage } from './MoviePage';
import { getMovieWithAdditionalInformation, postUser } from '../../Services/Service';
import { MovieWithAdditionalInformation } from '../../Services/ServiceTypes';
import { GetListnotRepeatWatchProviders } from '../../Auxiliary/GetListnotRepeatWatchProviders';
import { AuthPageActions, UserOperations } from '../../redux/AuthPageRedux/AuthPageActions';
import { useTypedSelector } from '../../Hooks/useTypedSelector';

export function MoviePageAux() {
  const dispatch = useDispatch();
  const url = useLocation();

  const user = useTypedSelector((store) => store.AuthPageReducer.user);

  const currentMovieId = url.pathname.split('/')[url.pathname.split('/').length - 1];
  const [currentMovie, setCurrentMovie] = useState<MovieWithAdditionalInformation>();

  function getFilmYear(date : string | undefined) : string {
    if (!date) {
      return '';
    }
    return date.split('-')[0];
  }
  const AddFilmToUserFavourite = (filmId : string) => {
    dispatch(AuthPageActions.SetFavoriteFilm(filmId));
  };

  useEffect(() => {
    getMovieWithAdditionalInformation(currentMovieId).then((movie) => { setCurrentMovie(movie); });
  }, [currentMovieId]);

  const setNewFavoriteFilm = (filmId : string) => {
    postUser({
      ...user,
      favoriteFilms: [...user.favoriteFilms, filmId],
    });
  };

  return (
    <div>
      <MoviePage
        currentMovieId={currentMovieId}
        voteAverage={currentMovie?.vote_average}
        genres={currentMovie?.genres}
        title={currentMovie?.title}
        posterPath={currentMovie?.poster_path}
        releaseYear={getFilmYear(currentMovie?.release_date)}
        adsWatchProviders={currentMovie?.watchProviders.ads}
        buyWatchProviders={currentMovie?.watchProviders.buy}
        flatrateWatchProviders={currentMovie?.watchProviders.flatrate}
        rentWatchProviders={currentMovie?.watchProviders.rent}
        overview={currentMovie?.overview}
        notRepeatedProviders={GetListnotRepeatWatchProviders(currentMovie?.watchProviders)}
        similarFilms={currentMovie?.similarFilms}
        AddFilmToUserFavourite={AddFilmToUserFavourite}
        runtime={currentMovie?.runtime}
        setNewFavoriteFilm={setNewFavoriteFilm}
      />
    </div>
  );
}
