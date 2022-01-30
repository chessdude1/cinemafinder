import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviePage } from './MoviePage';
import { getMovieWithAdditionalInformation } from '../../Services/Service';
import { MovieWithAdditionalInformation } from '../../Services/ServiceTypes';
import { GetListnotRepeatWatchProviders } from '../../Auxiliary/GetListnotRepeatWatchProviders';

export function MoviePageAux() {
  const url = useLocation();
  const currentMovieId = url.pathname.split('/')[url.pathname.split('/').length - 1];
  const [currentMovie, setCurrentMovie] = useState<MovieWithAdditionalInformation>();
  function getFilmYear(date : string | undefined) : string {
    if (!date) {
      return '';
    }
    return date.split('-')[0];
  }
  useEffect(() => {
    getMovieWithAdditionalInformation(currentMovieId).then((movie) => { setCurrentMovie(movie); });
  }, []);

  return (
    <div>
      <MoviePage
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
      />
    </div>
  );
}
