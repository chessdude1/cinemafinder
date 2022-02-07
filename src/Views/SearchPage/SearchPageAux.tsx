import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchPageActions, SearchPageActionTypes } from '../../redux/SearchPageRedux/SearchPageActions';
import { GenreFilters } from './Filters/GenreFilters';
import { ProviderFilter } from './Filters/ProviderFilter';
import { RatingFilter } from './Filters/RatingFilter';
import { SortOrder } from './Filters/SortOrder';
import { YearFilter } from './Filters/YearFilter';
import { sendUpdateFilterState } from './FilterStateUpdates';
import { SearchPage } from './SearchPage';
import { IGenre, providerFilter, watchProvider } from './SearchQueryTypes';
import './SearchPage.scss';

export function SearchPageAux() {
  const sortTypes: string[] = ['popularity.desc', 'popularity.asc', 'release_date.desc', 'release_date.asc', 'original_title.desc', 'original_title.asc'];
  const initGenresState: IGenre[] = [
    { id: 28, name: 'Action', applied: false },
    { id: 12, name: 'Adventure', applied: false },
    { id: 16, name: 'Animation', applied: false },
    { id: 35, name: 'Comedy', applied: false },
    { id: 80, name: 'Crime', applied: false },
    { id: 99, name: 'Documentary', applied: false },
    { id: 18, name: 'Drama', applied: false },
    { id: 10751, name: 'Family', applied: false },
    { id: 14, name: 'Fantasy', applied: false },
    { id: 36, name: 'History', applied: false },
    { id: 27, name: 'Horror', applied: false },
    { id: 10402, name: 'Music', applied: false },
    { id: 9648, name: 'Mystery', applied: false },
    { id: 10749, name: 'Romance', applied: false },
    { id: 878, name: 'Science Fiction', applied: false },
    { id: 10770, name: 'TV Movie', applied: false },
    { id: 53, name: 'Thriller', applied: false },
    { id: 10752, name: 'War', applied: false },
    { id: 37, name: 'Western', applied: false },
  ];
  const initProvidersState: providerFilter[] = [
    { id: 8, isApplied: false },
    { id: 119, isApplied: false },
    { id: 2, isApplied: false },
    { id: 3, isApplied: false },
    { id: 115, isApplied: false },
    { id: 116, isApplied: false },
    { id: 113, isApplied: false },
    { id: 11, isApplied: false },
    { id: 100, isApplied: false },
    { id: 534, isApplied: false },
    { id: 350, isApplied: false },
    { id: 190, isApplied: false },
    { id: 521, isApplied: false },
    { id: 501, isApplied: false },
    { id: 475, isApplied: false },
    { id: 546, isApplied: false },
    { id: 551, isApplied: false },
    { id: 554, isApplied: false },
    { id: 559, isApplied: false },
    { id: 444, isApplied: false },
    { id: 556, isApplied: false },
    { id: 557, isApplied: false },
    { id: 567, isApplied: false },
    { id: 445, isApplied: false },
    { id: 569, isApplied: false },
    { id: 315, isApplied: false },
    { id: 677, isApplied: false },
    { id: 570, isApplied: false },
    { id: 577, isApplied: false },
    { id: 117, isApplied: false },
    { id: 188, isApplied: false },
  ];
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);
  const providers = useTypedSelector((store) => store.SearchPageReducer.providersList);
  const pageNumber = useTypedSelector((store) => store.SearchPageReducer.pageNumber);
  const loading = useTypedSelector((store) => store.SearchPageReducer.isLoading);
  const allLoaded = useTypedSelector((store) => store.SearchPageReducer.isAllLoaded);
  const filtersInStore = useTypedSelector((store) => store.SearchPageReducer.filters);

  // const filterOfGenresInStore = useTypedSelector((store) => store.SearchPageReducer.filters.genre);
  // const filterOfYearsInStore = useTypedSelector((store) => store.SearchPageReducer.filters.year);
  // const filterOfRatingInStore = useTypedSelector((store) => store.SearchPageReducer.filters.rating);
  // const filterOfProvidersInStore = useTypedSelector((store) => store.SearchPageReducer.filters.providers);
  // const sortOrderInStore = useTypedSelector((store) => store.SearchPageReducer.filters.sortOrder);

  const [filterOfGenres, setFilterOfGenres] = useState(initGenresState);
  const [filterOfProviders, setFilterOfProviders] = useState<providerFilter[]>(initProvidersState);

  const [filterOfYears, setFilterOfYears] = useState<number[]>(filtersInStore.year);
  const [filterOfRatings, setFilterOfRatings] = useState<number[]>(filtersInStore.rating);
  const [sortOrder, setSortOrder] = useState(filtersInStore.sortOrder);
  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }
  function getProvidersList() {
    dispatch({ type: SearchPageSagaTypes.FETCHPROVIDERSSAGA });
  }
  // useEffect(() => {
  //   dispatch(updateFilterGenresState(filtersInStore, filterOfGenres));
  // }, filterOfGenres);
  // useEffect(() => {
  //   dispatch(updateFilterYearsState(filtersInStore, filterOfYears));
  // }, filterOfYears);
  // useEffect(() => {
  //   dispatch(updateFilterRatingsState(filtersInStore, filterOfRatings));
  // }, filterOfRatings);
  // useEffect(() => {
  //   dispatch(updateFilterProvidersState(filtersInStore, filterOfProviders));
  // }, filterOfProviders);
  useEffect(() => {
    if (!loading) {
      dispatch({ type: SearchPageActionTypes.UPDATE_LOADING_STATUS });
      dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
    }
  }, [filtersInStore]);
  useEffect(() => {
    dispatch(sendUpdateFilterState(filtersInStore, sortOrder, filterOfProviders, filterOfRatings, filterOfYears, filterOfGenres));
  }, [sortOrder, filterOfProviders, filterOfRatings, filterOfYears, filterOfGenres]);

  const isBottom = (el: HTMLElement) => el.getBoundingClientRect().bottom <= window.innerHeight;
  const trackScrolling = useCallback(() => {
    const el = document.getElementById('movies-filtered-list') as HTMLElement;
    if (isBottom(el) && !loading) {
      dispatch({ type: SearchPageActionTypes.UPDATE_LOADING_STATUS });
      dispatch({ type: SearchPageActionTypes.UPDATE_PAGE_NUMBER });
      dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
    }
  }, [pageNumber, loading, dispatch]);
  useEffect(() => {
    // getPopularMovies();
    getProvidersList();
  }, []);
  useEffect(() => {
    if (!allLoaded) {
      document.addEventListener('scroll', trackScrolling);
    }
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, [allLoaded, trackScrolling, dispatch]);
  return (
    <section className='search-page'>
      <div id='movies-filtered-list'>
        <SearchPage movies={movies} />
      </div>
      <div className='search-features'>
        <SortOrder setSortOrder={setSortOrder} sortOrder={sortOrder} sortsList={sortTypes} />
        <ProviderFilter setFilterOfProviders={setFilterOfProviders} filterOfProviders={filterOfProviders} providerList={providers} />

        <GenreFilters setFilterOfGenres={setFilterOfGenres} genreFilter={filterOfGenres} />
        <div className='filters'>
          <YearFilter setFilterOfYears={setFilterOfYears} filterOfYears={filterOfYears} />
          <RatingFilter setFilterOfRatings={setFilterOfRatings} filterOfRatings={filterOfRatings} />
        </div>
      </div>
    </section>
  );
}
