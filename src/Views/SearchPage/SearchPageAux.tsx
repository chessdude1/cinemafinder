import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchPageActions } from '../../redux/SearchPageRedux/SearchPageActions';
import { GenreFilters } from './Filters/GenreFilters';
import { RatingFilter } from './Filters/RatingFilter';
import { YearFilter } from './Filters/YearFilter';
import {
  updateFilterGenresState,
  updateFilterYearsState,
  updateFilterRatingsState,
} from './FilterStateUpdates';
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
  const filterOfGenresInStore = useTypedSelector((store) => store.SearchPageReducer.genre);
  const filterOfYearsInStore = useTypedSelector((store) => store.SearchPageReducer.year);
  const filterOfRatingInStore = useTypedSelector((store) => store.SearchPageReducer.rating);

  const [filterOfGenres, setFilterOfGenres] = useState(filterOfGenresInStore);
  const [filterOfYears, setFilterOfYears] = useState<number[]>(filterOfYearsInStore);
  const [filterOfRatings, setFilterOfRatings] = useState<number[]>(filterOfRatingInStore);
  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }

  useEffect(() => {
    dispatch(updateFilterGenresState(filterOfGenres));
  }, filterOfGenres);
  useEffect(() => {
    dispatch(updateFilterYearsState(filterOfYears));
  }, filterOfYears);
  useEffect(() => {
    dispatch(updateFilterRatingsState(filterOfRatings));
  }, filterOfRatings);

  useEffect(() => {
    dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
  }, [filterOfGenresInStore, filterOfYearsInStore, filterOfRatingInStore]);

  useEffect(() => {
    getPopularMovies();
  }, []);
  return (
    <section>
      <SearchPage movies={movies} />
      <div className='filters'>
        <GenreFilters setFilterOfGenres={setFilterOfGenres} genreFilter={filterOfGenres} />
        <YearFilter setFilterOfYears={setFilterOfYears} filterOfYears={filterOfYears} />
        <RatingFilter setFilterOfRatings={setFilterOfRatings} filterOfRatings={filterOfRatings} />
      </div>
    </section>
  );
}
