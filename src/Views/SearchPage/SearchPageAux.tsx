import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchPageActions } from '../../redux/SearchPageRedux/SearchPageActions';
import { GenreFilters } from './Filters/GenreFilters';
import { SearchPage } from './SearchPage';
import { genre } from './SearchQueryTypes';

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
  const filterOfGenresInStore = useTypedSelector(
    (store) => store.SearchPageReducer.genre,
  );

  const [filterOfGenres, setFilterOfGenres] = useState(filterOfGenresInStore);
  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }

  function changeFilterState(filter: genre[]) {
    dispatch(SearchPageActions.UpdateGenresFilter(filter));
  }
  useEffect(() => {
    getPopularMovies();
  }, []);

  useEffect(() => {
    changeFilterState(filterOfGenres);
  }, filterOfGenres);
  useEffect(() => {
    dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
  }, filterOfGenresInStore);
  return (
    <section>
      <SearchPage movies={movies} />
      <GenreFilters
        setFilterOfGenres={setFilterOfGenres}
        genreFilter={filterOfGenres}
      />
    </section>
  );
}
