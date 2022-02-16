import React from 'react';
import { Movie } from '../../../redux/SearchPageRedux/SearchPageActions';
import { FavoriteFilmCard } from '../../FavouritesPage/FavoriteFilmCard/FavoriteFilmCard';
import { INIT_GENRES_STATE } from '../Filters/InitialStates';
import { MovieCardSmall } from './MovieCard/MovieCardSmall';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';
import './style.scss';

export interface SearchPageType {
  movies: Movie[];
}

export function SearchPage({ movies }: SearchPageType) {
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res!.name;
  }
  function translate(ids: number[]) {
    const genresArray = ids.map((id) => ({ id, name: getGenreName(id) }));
    return TranslateGenre(genresArray);
  }
  return (
    <section>
      <div className='movie-table'>
        {movies.map((movie) => (
          <MovieCardSmall
            classStyle='movie-card__small'
            key={movie.id}
            id={movie.id}
            posterPath={movie.poster_path}
            originalTitle={movie.title}
            year={movie.release_date.slice(0, 4)}
            genre={translate(movie.genre_ids).join(',')}
          />
        ))}
      </div>
    </section>
  );
}
