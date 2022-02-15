import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TranslateGenre } from '../../../../Auxiliary/TranslateGenre';
import { Movie } from '../../../../redux/SearchPageRedux/SearchPageActions';
import { QueriedMovie } from '../../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { INIT_GENRES_STATE } from '../../Filters/InitialStates';
import { MovieCardSmall } from '../../MovieTable/MovieCard/MovieCardSmall';

interface QueryResultPopupAuxType {
  movies: Movie[];
}
export function QueryResultPopupAux({ movies }: QueryResultPopupAuxType) {
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res!.name;
  }
  function translate(ids: number[]) {
    const genresArray = ids.map((id) => ({ id, name: getGenreName(id) }));
    return TranslateGenre(genresArray);
  }
  return (
    <div className='query-results'>
      {movies.map((movie) => (
        <MovieCardSmall
          classStyle='movie-card__popup'
          key={movie.id}
          year={movie.release_date.slice(0, 4)}
          originalTitle={movie.title}
          id={movie.id}
          posterPath={movie.poster_path}
          genre={translate(movie.genre_ids).join(',')}
        />
      ))}
    </div>
  );
}
