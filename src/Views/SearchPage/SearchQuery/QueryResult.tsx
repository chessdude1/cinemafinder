import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface SearchQueryResultType {
  id: number;
  title: string;
  genres: string;
  posterPath: string;
}
export function SearchQueryResult({ id, title, genres, posterPath }: SearchQueryResultType) {
  const link = `/movie/${id}`;
  return (
    <NavLink to={link}>
      <div>
        <img src={`https://image.tmdb.org/t/p/w342${posterPath}`} alt={title} />
        <h5>{title}</h5>
        <h6>{genres}</h6>
      </div>
    </NavLink>
  );
}
