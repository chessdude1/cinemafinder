import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import './MovieCardSmall.scss';

interface MovieCardSmallType {
  id: number;
  posterPath: string;
  originalTitle: string;
  year: string;
  genre: string;
  classStyle?: string;
}

export function MovieCardSmall({ id, posterPath, originalTitle, year, genre, classStyle }: MovieCardSmallType) {
  const link = `/movie/${id}`;
  const nodeRef = React.useRef(null);
  return (
    <NavLink className={classStyle} to={link}>
      <img className='poster' alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
      <div className='description'>
        <h2 className='description__title'>{originalTitle}</h2>
        <div className='description__extra'>
          {year}
          {', '}
          {genre}
        </div>
      </div>
    </NavLink>
  );
}
