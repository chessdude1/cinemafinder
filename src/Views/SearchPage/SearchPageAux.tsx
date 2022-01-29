import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { Movie } from '../../redux/SearchPageRedux/SearchPageActions';
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
  const filters = useTypedSelector((store) => store.SearchPageReducer.filters);
  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <section>
      <SearchPage movies={movies} />
    </section>
  );
}
