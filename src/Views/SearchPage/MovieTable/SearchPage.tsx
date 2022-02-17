import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Movie } from '../../../redux/SearchPageRedux/SearchPageActions';
import { INIT_GENRES_STATE } from '../Filters/InitialStates';
import { MovieCardSmall } from './MovieCard/MovieCardSmall';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';
import { GetGenresFromIds } from '../../../Auxiliary/GetGenresFromIds';
import './SearchPageStyle.scss';
import { useTypedSelector } from '../../../Hooks/useTypedSelector';

export function SearchPage() {
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);
  const nodeRef = React.useRef(null);
  function translate(ids: number[]) {
    const genresArray = GetGenresFromIds(ids);
    return TranslateGenre(genresArray).join(', ');
  }

  return (
    <section>
      <TransitionGroup className='movie-table'>
        {movies.map((movie) => (
          <CSSTransition nodeRef={nodeRef} key={movie.id} timeout={500} classNames='item'>
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
