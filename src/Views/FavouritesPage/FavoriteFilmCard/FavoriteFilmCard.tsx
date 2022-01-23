import React from 'react';

interface FavoriteFilmCardType {
  id : number,
  posterPath: string,
  originalTitle : string
}

export function FavoriteFilmCard({ id, posterPath, originalTitle } : FavoriteFilmCardType) {
  return (
    <div>
      <h2>{originalTitle}</h2>
      <h2>{id}</h2>
      <img alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
    </div>
  );
}
