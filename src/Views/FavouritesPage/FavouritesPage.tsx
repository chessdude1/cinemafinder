import React from 'react';
import { FavouriteFilm } from '../../redux/FavouritesPageRedux/FavouritePageActions';
import { FavoriteFilmCard } from './FavoriteFilmCard/FavoriteFilmCard';
import './FavouritePageStyles.scss';

interface FavouritesPageType {
  favoriteFilms : Array<FavouriteFilm>
}

export function FavouritesPage({ favoriteFilms } : FavouritesPageType) {
  return (
    <main className='favourite-page'>
      <section className='films-list'>
        {favoriteFilms.map((favoriteFilm) => (
          <FavoriteFilmCard
            id={favoriteFilm.id}
            posterPath={favoriteFilm.posterPath}
            originalTitle={favoriteFilm.originalTitle}
          />
        ))}
      </section>
      <div className='filters'>
        <div className='filters__rating-filter'>
          123
        </div>
      </div>
    </main>
  );
}
