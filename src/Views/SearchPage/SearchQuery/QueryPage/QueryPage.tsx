import _ from 'lodash';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TranslateGenre } from '../../../../Auxiliary/TranslateGenre';
import { useTypedSelector } from '../../../../Hooks/useTypedSelector';
import { SearchQuerySagaTypes } from '../../../../redux/Sages/SearchQuerySaga';
import { SearchQueryActionTypes } from '../../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { INIT_GENRES_STATE } from '../../Filters/InitialStates';
import { MovieCardMedium } from './MovieCardMedium/MovieCardMedium';

export function QueryPageAux() {
  const movies = useTypedSelector((store) => store.SearchQueryReducer.movies);
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res!.name;
  }
  function translate(ids: number[]) {
    const genresArray = ids.map((id) => ({ id, name: getGenreName(id) }));
    return TranslateGenre(genresArray);
  }
  return (
    <div className='movie-table'>
      {movies.map((movie) => (
        <MovieCardMedium
          classStyle='movie-card__medium'
          key={movie.id}
          providers={movie.media_type}
          rating={movie.vote_average}
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
