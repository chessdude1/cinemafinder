import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MoviePage } from './MoviePage';
import { getMovieWithAdditionalInformation, postUser } from '../../Services/Service';
import { MovieWithAdditionalInformation } from '../../Services/ServiceTypes';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { currentLanguage } from '../../redux/AuthPageRedux/AuthPageReducer';
import { Loader } from '../../Common/UX/Loader/Loader';

export function MoviePageAux() {
  const dispatch = useDispatch();
  const url = useLocation();

  const user = useTypedSelector((store) => store.AuthPageReducer.user);
  const isLogin = useTypedSelector((store) => store.AuthPageReducer.isLogin);

  const currentMovieId = url.pathname.split('/')[url.pathname.split('/').length - 1];
  const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false);
  const [currentMovie, setCurrentMovie] = useState<MovieWithAdditionalInformation>();

  const isFilmAlreadyInFavourites = user.favoriteFilms.includes(currentMovieId);

  function getFilmYear(date : string | undefined) : string {
    if (!date) {
      return '';
    }
    return date.split('-')[0];
  }

  useEffect(() => {
    async function FetchMovie() {
      setIsMovieLoading(true);
      const movie = await getMovieWithAdditionalInformation(currentMovieId, currentLanguage);
      setCurrentMovie(movie);
      setIsMovieLoading(false);
    }
    FetchMovie();
  }, [currentMovieId]);

  const setNewFavoriteFilm = (filmId : string) => {
    postUser({
      ...user,
      favoriteFilms: [...user.favoriteFilms, filmId],
    });
    dispatch(AuthPageActions.SetFavoriteFilm(filmId));
  };

  const deleteFilmFromFavorite = (filmId : string) => {
    const userfavoriteFilmsAfterDelete = user.favoriteFilms.filter((film) => film !== filmId);
    postUser({
      ...user,
      favoriteFilms: [...userfavoriteFilmsAfterDelete],
    });
    dispatch(AuthPageActions.DeleteFavoriteFilm(filmId));
  };

  return (
    <div>
      {
        isMovieLoading ? <Loader /> : (
          <MoviePage
            titleTranslated={currentMovie?.titleTranslated}
            overviewTranslated={currentMovie?.overviewTranslated}
            isLogin={isLogin}
            deleteFilmFromFavorite={deleteFilmFromFavorite}
            isFilmAlreadyInFavourites={isFilmAlreadyInFavourites}
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
            similarFilms={currentMovie?.similarFilms}
            runtime={currentMovie?.runtime}
            setNewFavoriteFilm={setNewFavoriteFilm}
          />
        )
      }

    </div>
  );
}
