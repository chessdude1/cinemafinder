import React from 'react';
import { NavLink } from 'react-router-dom';

interface FavoriteFilmCardType {
  id : number,
  posterPath: string,
  originalTitle : string
}

export function FavoriteFilmCard({ id, posterPath, originalTitle } : FavoriteFilmCardType) {
  const link = `/movie/${id}`;
  return (
    <NavLink to={link}>
      <div>
        <h2>{originalTitle}</h2>
        <h2>{id}</h2>
        <img alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
      </div>
    </NavLink>
  );
}
