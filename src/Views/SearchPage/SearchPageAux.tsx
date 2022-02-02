import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchPageActions } from '../../redux/SearchPageRedux/SearchPageActions';
import { GenreFilters } from './Filters/GenreFilters';
import { ProviderFilter } from './Filters/ProviderFilter';
import { RatingFilter } from './Filters/RatingFilter';
import { SortOrder } from './Filters/SortOrder';
import { YearFilter } from './Filters/YearFilter';
import { updateFilterGenresState, updateFilterYearsState, updateFilterRatingsState, updateFilterProvidersState, updateSortOrderState } from './FilterStateUpdates';
import { SearchPage } from './SearchPage';
import { genre, providerFilter, watchProvider } from './SearchQueryTypes';

export function SearchPageAux() {
  const sortTypes: string[] = ['popularity.desc', 'popularity.asc', 'release_date.desc', 'release_date.asc', 'original_title.desc', 'original_title.asc'];
  const initialFilters = {
    genre: '',
    country: '',
    provider: '',
  };
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);
  const providers = useTypedSelector((store) => store.SearchPageReducer.providersList);

  const filterOfGenresInStore = useTypedSelector((store) => store.SearchPageReducer.genre);
  const filterOfYearsInStore = useTypedSelector((store) => store.SearchPageReducer.year);
  const filterOfRatingInStore = useTypedSelector((store) => store.SearchPageReducer.rating);
  const filterOfProvidersInStore = useTypedSelector((store) => store.SearchPageReducer.providers);
  const sortOrderInStore = useTypedSelector((store) => store.SearchPageReducer.sortOrder);

  const [filterOfGenres, setFilterOfGenres] = useState(filterOfGenresInStore);
  const [filterOfProviders, setFilterOfProviders] = useState<providerFilter[]>(filterOfProvidersInStore);

  const [filterOfYears, setFilterOfYears] = useState<number[]>(filterOfYearsInStore);
  const [filterOfRatings, setFilterOfRatings] = useState<number[]>(filterOfRatingInStore);
  const [sortOrder, setSortOrder] = useState(sortOrderInStore);
  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }
  function getProvidersList() {
    dispatch({ type: SearchPageSagaTypes.FETCHPROVIDERSSAGA });
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
    dispatch(updateFilterProvidersState(filterOfProviders));
  }, filterOfProviders);
  useEffect(() => {
    dispatch(updateSortOrderState(sortOrder));
  }, [sortOrder]);

  useEffect(() => {
    dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
  }, [filterOfGenresInStore, filterOfYearsInStore, filterOfRatingInStore, filterOfProvidersInStore, sortOrderInStore]);

  useEffect(() => {
    getPopularMovies();
    getProvidersList();
  }, []);
  return (
    <section>
      <SearchPage movies={movies} />
      <SortOrder setSortOrder={setSortOrder} sortOrder={sortOrder} sortsList={sortTypes} />
      <ProviderFilter setFilterOfProviders={setFilterOfProviders} filterOfProviders={filterOfProviders} providerList={providers} />
      <div className='filters'>
        <GenreFilters setFilterOfGenres={setFilterOfGenres} genreFilter={filterOfGenres} />
        <YearFilter setFilterOfYears={setFilterOfYears} filterOfYears={filterOfYears} />
        <RatingFilter setFilterOfRatings={setFilterOfRatings} filterOfRatings={filterOfRatings} />
      </div>
    </section>
  );
}
