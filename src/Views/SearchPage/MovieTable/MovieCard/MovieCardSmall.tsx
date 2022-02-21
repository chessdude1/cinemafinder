import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './MovieCardSmall.scss';
import imgNotFound from '../../../../Assets/img/NotFoundImg/notFound.svg';

interface MovieCardSmallType {
  id: number;
  posterPath: string;
  originalTitle: string;
  year: string;
  genre: string;
  classStyle?: string;
  title: string
}

export function MovieCardSmall({ id, posterPath, originalTitle, year, genre, classStyle, title }: MovieCardSmallType) {
  const link = `/movie/${id}`;
  const nodeRef = React.useRef(null);
  return (
    <NavLink className={classStyle} to={link}>
      <img className='poster' alt={originalTitle} src={posterPath ? `https://image.tmdb.org/t/p/w342${posterPath}` : imgNotFound} />
      <div className='description'>
        <Typography sx={{ color: 'black', fontWeight: '500' }} variant='h5'>
          {title || originalTitle}
        </Typography>
        <div className='description__extra'>
          <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.8rem' }} variant='subtitle1'>
            {year}
            {', '}
            {genre}
          </Typography>
        </div>
      </div>
    </NavLink>
  );
}
