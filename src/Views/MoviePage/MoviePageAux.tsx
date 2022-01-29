import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MoviePage } from './MoviePage';
import { getMovieWithAdditionalInformation } from '../../Services/Service';
import { MovieWithAdditionalInformation } from '../../Services/ServiceTypes';

export function MoviePageAux() {
  const url = useLocation();
  const currentMovieId = url.pathname.split('/')[url.pathname.split('/').length - 1];
  const [currentMovie, setCurrentMovie] = useState<MovieWithAdditionalInformation>();

  useEffect(() => {
    getMovieWithAdditionalInformation(currentMovieId).then((movie) => { setCurrentMovie(movie); });
  }, []);

  let currentMovieExist = null; // if we dont get current movie => currentMovie = null
  if (currentMovie) {
    currentMovieExist = currentMovie;
  }
  return <div><MoviePage currentMovie={currentMovieExist} /></div>;
}
