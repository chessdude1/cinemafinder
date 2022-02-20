import React from 'react';
import _ from 'lodash';
import { GetGenresFromIds } from '../../../../Auxiliary/GetGenresFromIds';
import { useTypedSelector } from '../../../../Hooks/useTypedSelector';
import { QueriedMovie } from '../../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { FavoriteFilmCard } from '../../../FavouritesPage/FavoriteFilmCard/FavoriteFilmCard';
import { INIT_GENRES_STATE } from '../../Filters/InitialStates';
import { SearchQueryAux } from '../QueryAux';
import './QueryPage.scss';
import { MovieCardMedium } from './MovieCardMedium/MovieCardMedium';

export function QueryPageAux() {
  const movies: QueriedMovie[] = useTypedSelector((store) => store.SearchQueryReducer.moviesWithProvider);

  return (
    <>
      <div className='query-page__search-field'>
        <SearchQueryAux inputPaddings={1} />
      </div>
      <div className='movie-table'>
        {movies.map((movie) => (
          <FavoriteFilmCard
            key={movie.id}
            watchProviders={movie.watchProviders}
            voteAverage={movie.voteAverage}
            releaseDate={movie.releaseDate}
            originalTitle={movie.originalTitle}
            posterPath={movie.posterPath}
            genres={GetGenresFromIds(movie.genres)}
            id={movie.id}
          />
        ))}
      </div>
    </>
  );
}
