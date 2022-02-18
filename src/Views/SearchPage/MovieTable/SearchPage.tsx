import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MovieCardSmall } from './MovieCard/MovieCardSmall';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';
import { GetGenresFromIds } from '../../../Auxiliary/GetGenresFromIds';
import './SearchPageStyle.scss';
import { useTypedSelector } from '../../../Hooks/useTypedSelector';

export function SearchPage() {
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);

  function translate(ids: number[]) {
    const genresArray = GetGenresFromIds(ids);
    return TranslateGenre(genresArray).join(', ');
  }

  return (
    <section>
      <TransitionGroup className='movie-table'>
        {movies.map((movie) => (
          <CSSTransition key={movie.id} timeout={500} classNames='movie-table__item'>
            <MovieCardSmall
              classStyle='movie-card__small'
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.title}
              year={movie.release_date.slice(0, 4)}
              genre={translate(movie.genre_ids)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
}
