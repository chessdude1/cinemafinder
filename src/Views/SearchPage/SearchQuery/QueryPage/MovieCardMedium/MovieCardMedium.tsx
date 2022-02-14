import React from 'react';
import { NavLink } from 'react-router-dom';
import './MovieCardMedium.scss';

interface MovieCardMediumType {
  id: number;
  posterPath: string;
  originalTitle: string;
  year: string;
  genre: string;
  classStyle: string;
  rating: number;
  providers: string;
}

export function MovieCardMedium({ id, posterPath, originalTitle, year, genre, classStyle, rating, providers }: MovieCardMediumType) {
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
          {rating}
        </h3>
      </div>
    </NavLink>
  );
}
