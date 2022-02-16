import _ from 'lodash';
import React from 'react';
import { TranslateGenre } from '../../../../Auxiliary/TranslateGenre';
import { useTypedSelector } from '../../../../Hooks/useTypedSelector';
import { QueriedMovie } from '../../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { INIT_GENRES_STATE } from '../../Filters/InitialStates';
import { MovieCardMedium } from './MovieCardMedium/MovieCardMedium';

export function QueryPageAux() {
  const movies: QueriedMovie[] = useTypedSelector((store) => store.SearchQueryReducer.moviesWithProvider);
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
          providers={movie.watchProviders}
          rating={movie.voteAverage}
          year={movie.releaseDate.slice(0, 4)}
          originalTitle={movie.originalTitle}
          id={movie.id}
          posterPath={movie.posterPath}
          genre={translate(movie.genres).join(',')}
        />
      ))}
    </div>
  );
}
