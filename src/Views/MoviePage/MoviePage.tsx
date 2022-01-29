import React from 'react';
import { MovieWithAdditionalInformation } from '../../Services/ServiceTypes';
import './MoviePageStyles.scss';

interface MoviePage2 {
  currentMovie : MovieWithAdditionalInformation | null
}

export function MoviePage({ currentMovie } : MoviePage2) {
  return (
    <main className='movie-page'>
      <section className='poster'>
        <div>

          <img src={`https://image.tmdb.org/t/p/w342${currentMovie?.backdrop_path}`} alt='12' />

        </div>

        <button type='submit'>Добавить в избранное</button>
        <p>
          Rating :
          {currentMovie?.vote_average}
          /
          {currentMovie?.vote_count}
        </p>
      </section>
      <section className='movie-description'>
        123
      </section>
    </main>
  );
}
