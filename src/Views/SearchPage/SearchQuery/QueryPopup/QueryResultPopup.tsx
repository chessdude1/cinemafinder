import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SearchQueryResultType {
  id: number;
  title: string;
  genres: string;
  posterPath: string;
  year: string;
}
export function QueryResultPopup({ id, title, genres, posterPath, year }: SearchQueryResultType) {
  const link = `/movie/${id}`;
  return (
    <NavLink className='movie-card__popup' to={link}>
      <div>
        <img src={`https://image.tmdb.org/t/p/w342${posterPath}`} alt={title} />
        <h5>{title}</h5>
        <h6>
          {year}
          {', '}
          {genres}
        </h6>
      </div>
    </NavLink>
  );
}
