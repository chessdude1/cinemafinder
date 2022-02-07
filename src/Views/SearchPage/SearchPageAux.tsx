import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchPageActions, SearchPageActionTypes } from '../../redux/SearchPageRedux/SearchPageActions';
import { GenreFilters } from './Filters/GenreFilters';
import { ProviderFilter, ProviderFilterType } from './Filters/ProviderFilter';
import { RatingFilter } from './Filters/RatingFilter';
import { SortOrder } from './Filters/SortOrder';
import { YearFilter } from './Filters/YearFilter';
import { getStateFromStore, sendUpdateFilterState } from './FilterStateUpdates';
import { SearchPage } from './SearchPage';
import { IGenre, providerFilter, watchProvider } from './SearchQueryTypes';
import './SearchPage.scss';

export function SearchPageAux() {
  const sortTypes: string[] = ['popularity.desc', 'popularity.asc', 'release_date.desc', 'release_date.asc', 'original_title.desc', 'original_title.asc'];
  let initGenresState: IGenre[] = [
    { id: 28, name: 'Action', isApplied: false },
    { id: 12, name: 'Adventure', isApplied: false },
    { id: 16, name: 'Animation', isApplied: false },
    { id: 35, name: 'Comedy', isApplied: false },
    { id: 80, name: 'Crime', isApplied: false },
    { id: 99, name: 'Documentary', isApplied: false },
    { id: 18, name: 'Drama', isApplied: false },
    { id: 10751, name: 'Family', isApplied: false },
    { id: 14, name: 'Fantasy', isApplied: false },
    { id: 36, name: 'History', isApplied: false },
    { id: 27, name: 'Horror', isApplied: false },
    { id: 10402, name: 'Music', isApplied: false },
    { id: 9648, name: 'Mystery', isApplied: false },
    { id: 10749, name: 'Romance', isApplied: false },
    { id: 878, name: 'Science Fiction', isApplied: false },
    { id: 10770, name: 'TV Movie', isApplied: false },
    { id: 53, name: 'Thriller', isApplied: false },
    { id: 10752, name: 'War', isApplied: false },
    { id: 37, name: 'Western', isApplied: false },
  ];
  let initProvidersState: providerFilter[] = [
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

  const genresFromStore = filtersInStore.genre;
  const providersFromStore = filtersInStore.providers;
  if (genresFromStore.length !== 0) {
    initGenresState = getStateFromStore(genresFromStore, initGenresState) as IGenre[];
  }

  if (providersFromStore.length !== 0) {
    initProvidersState = getStateFromStore(providersFromStore, initProvidersState) as providerFilter[];
  }

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

  useEffect(() => {
    dispatch(sendUpdateFilterState(filtersInStore, sortOrder, filterOfProviders, filterOfRatings, filterOfYears, filterOfGenres));
  }, [sortOrder, filterOfProviders, filterOfRatings, filterOfYears, filterOfGenres]);
  useEffect(() => {
    if (!loading) {
      dispatch({ type: SearchPageActionTypes.UPDATE_LOADING_STATUS });
      dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
    }
  }, [filtersInStore]);
  const isBottom = (el: HTMLElement) => el.getBoundingClientRect().bottom <= window.innerHeight - 200;
  const trackScrolling = useCallback(() => {
    const el = document.getElementById('movies-filtered-list') as HTMLElement;
    if (isBottom(el) && !loading) {
      dispatch({ type: SearchPageActionTypes.UPDATE_LOADING_STATUS });
      dispatch({ type: SearchPageActionTypes.UPDATE_PAGE_NUMBER });
      dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
    }
  }, [pageNumber, loading, dispatch]);
  useEffect(() => {
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
