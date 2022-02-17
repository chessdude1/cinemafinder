import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TranslateGenre } from '../../../../Auxiliary/TranslateGenre';
import { Movie } from '../../../../redux/SearchPageRedux/SearchPageActions';
import { QueriedMovie } from '../../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { INIT_GENRES_STATE } from '../../Filters/InitialStates';
import { MovieCardSmall } from '../../MovieTable/MovieCard/MovieCardSmall';

interface QueryResultPopupAuxType {
  movies: Movie[];
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  focused: boolean;
}

export function QueryResultPopupAux({ movies, setFocus, focused }: QueryResultPopupAuxType) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      if (focused && ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setFocus(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [focused]);
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res ? res.name : '';
  }
  function translate(ids: number[]) {
    const genresArray = ids.map((id) => ({ id, name: getGenreName(id) }));
    return TranslateGenre(genresArray);
  }
  return (
    <div ref={ref} className='query-results'>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events
       */}
      <div
        onClick={() => setFocus(true)}
        onKeyDown={() => setFocus(true)}
        role='button'
        tabIndex={0}
        className='movie-cards__container'
      >
        {movies.map((movie) => (
          <MovieCardSmall
            classStyle='movie-card__popup'
            key={movie.id}
            year={movie.release_date?.slice(0, 4)}
            originalTitle={movie.title}
            id={movie.id}
            posterPath={movie.poster_path}
            genre={translate(movie.genre_ids)?.join(',')}
          />
        ))}
      </div>
    </div>
  );
}
