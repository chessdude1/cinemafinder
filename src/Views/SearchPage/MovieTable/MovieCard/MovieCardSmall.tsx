import React from 'react';
import { NavLink } from 'react-router-dom';
import './MovieCardSmall.scss';

interface MovieCardSmallType {
  id: number;
  posterPath: string;
  originalTitle: string;
  year: string;
  genre: string;
  classStyle: string;
}

export function MovieCardSmall({ id, posterPath, originalTitle, year, genre, classStyle }: MovieCardSmallType) {
  const link = `/movie/${id}`;
  return (
    <NavLink className={classStyle} to={link}>
      <img className='poster' alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
      <div className='description'>
        <h2>{originalTitle}</h2>
        <h3>
          <span>
            {year}
            {', '}
          </span>
          <span>{genre}</span>
        </h3>
      </div>
    </NavLink>
  );
}
