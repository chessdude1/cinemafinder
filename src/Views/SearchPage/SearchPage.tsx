import React from 'react';
import { Movie } from '../../redux/SearchPageRedux/SearchPageActions';
import { FavoriteFilmCard } from '../FavouritesPage/FavoriteFilmCard/FavoriteFilmCard';

export interface SearchPageType {
  movies: Movie[];
}

export function SearchPage({ movies }: SearchPageType) {
  return (
    <section>
      <h2>search</h2>
      <div className='movie-table'>
        {movies.map((movie) => (
          <FavoriteFilmCard key={movie.id} id={movie.id} posterPath={movie.poster_path} originalTitle={movie.title} />
        ))}
      </div>
    </section>
  );
}
