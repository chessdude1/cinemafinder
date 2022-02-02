import React from 'react';
import { Movie } from '../../redux/SearchPageRedux/SearchPageActions';
import { MovieCard } from './MovieCard/MovieCard';

export interface SearchPageType {
  movies: Movie[];
}

export function SearchPage({ movies }: SearchPageType) {
  return (
    <section>
      <h2>search</h2>
      <div className='movie-table'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} id={movie.id} title={movie.title} posterPath={movie.poster_path} />
        ))}
      </div>
    </section>
  );
}
