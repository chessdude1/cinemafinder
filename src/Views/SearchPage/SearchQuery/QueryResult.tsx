import React, { useEffect, useState } from 'react';

interface SearchQueryResultType {
  title: string;
  genres: string;
  posterPath: string;
}
export function SearchQueryResult({ title, genres, posterPath }: SearchQueryResultType) {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w342${posterPath}`} alt='movie-poster' />
      <h5>{title}</h5>
      <p>{genres}</p>
    </div>
  );
}
