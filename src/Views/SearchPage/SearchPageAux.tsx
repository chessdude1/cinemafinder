import React from 'react';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPage } from './SearchPage';

export interface sortOrderTypes {
  titleAsc: boolean;
  titleDesc: boolean;
  rating: boolean;
}

export function SearchPageAux() {
  const initialSortOrder = {
    titleAsc: false,
    titleDesc: false,
    rating: true,
  };
  const initialFilters = {
    genre: '',
    country: '',
    provider: '',
  };
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);
  return (
    <section>
      <SearchPage movies={movies} />
    </section>
  );
}
