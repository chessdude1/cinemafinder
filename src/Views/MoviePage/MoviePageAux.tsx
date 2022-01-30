import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MoviePage } from './MoviePage';
import { getMovieWithAdditionalInformation } from '../../Services/Service';
import { MovieWithAdditionalInformation } from '../../Services/ServiceTypes';
import { GetListnotRepeatWatchProviders } from '../../Auxiliary/GetListnotRepeatWatchProviders';
import { AuthorizationPage } from '../AuthorizationPage/AuthorizationPage';
import { AuthPageActions, UserOperations } from '../../redux/AuthPageRedux/AuthPageActions';
import { useTypedSelector } from '../../Hooks/useTypedSelector';

export function MoviePageAux() {
  const dispatch = useDispatch();
  const url = useLocation();
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

  const user = useTypedSelector((store) => store.AuthPageReducer.user);
  console.log(user);
  return (
    <div>
      <MoviePage
        currentMovieId={currentMovieId}
        voteAverage={currentMovie?.vote_average}
        genres={currentMovie?.genres}
        voteCount={currentMovie?.vote_count}
        title={currentMovie?.title}
        backdropPath={currentMovie?.backdrop_path}
        releaseYear={getFilmYear(currentMovie?.release_date)}
        adsWatchProviders={currentMovie?.watchProviders.ads}
        buyWatchProviders={currentMovie?.watchProviders.buy}
        flatrateWatchProviders={currentMovie?.watchProviders.flatrate}
        rentWatchProviders={currentMovie?.watchProviders.rent}
        overview={currentMovie?.overview}
        notRepeatedProviders={GetListnotRepeatWatchProviders(currentMovie?.watchProviders)}
        similarFilms={currentMovie?.similarFilms}
        AddFilmToUserFavourite={AddFilmToUserFavourite}
      />
    </div>
  );
}
