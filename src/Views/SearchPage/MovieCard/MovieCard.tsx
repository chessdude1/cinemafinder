import React from 'react';

export interface MovieCardType {
  title: string;
  posterPath: string;
}
export function MovieCard({ title, posterPath }: MovieCardType) {
  return (
    <div className='movie-slot'>
      <img src={`https://image.tmdb.org/t/p/w342${posterPath}`} alt='' />
      <div className='title'>{title}</div>
    </div>
  );
}
