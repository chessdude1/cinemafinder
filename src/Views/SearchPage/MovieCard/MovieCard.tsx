import React from 'react';
import { NavLink } from 'react-router-dom';

export interface MovieCardType {
  id: number;
  title: string;
  posterPath: string;
}
export function MovieCard({ id, title, posterPath }: MovieCardType) {
  const link = `/movie/${id}`;
  return (
    <NavLink to={link}>
      <div className='movie-slot'>
        <img src={`https://image.tmdb.org/t/p/w342${posterPath}`} alt='' />
        <div className='title'>{title}</div>
      </div>
    </NavLink>
  );
}
