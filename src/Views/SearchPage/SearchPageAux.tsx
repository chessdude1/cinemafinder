import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchPageActionTypes } from '../../redux/SearchPageRedux/SearchPageActions';
import { GenreFilters } from './Filters/GenreFilters';
import { ProviderFilter, ProviderFilterType } from './Filters/ProviderFilter';
import { RatingFilter } from './Filters/RatingFilter';
import { SortOrder } from './Filters/SortOrder';
import { YearFilter } from './Filters/YearFilter';
import { getStateFromStore, sendUpdateFilterState } from './FilterStateUpdates';
import { SearchPage } from './MovieTable/SearchPage';
import { IGenre, providerFilter, sortTypes } from './SearchQueryTypes';
import { INIT_GENRES_STATE, INIT_PROVIDERS_STATE, INIT_RATING_STATE, INIT_SORT_ORDER, INIT_YEARS_STATE } from './Filters/InitialStates';
import './SearchPage.scss';

export function SearchPageAux() {
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);
  const providers = useTypedSelector((store) => store.SearchPageReducer.providersList);
  const pageNumber = useTypedSelector((store) => store.SearchPageReducer.pageNumber);
  const loading = useTypedSelector((store) => store.SearchPageReducer.isLoading);
  const allLoaded = useTypedSelector((store) => store.SearchPageReducer.isAllLoaded);
  const filtersInStore = useTypedSelector((store) => store.SearchPageReducer.filters);
  const footerIndent = 150;

  const initGenresState = getStateFromStore(filtersInStore.genre, INIT_GENRES_STATE) as IGenre[];
  const initProvidersState = getStateFromStore(filtersInStore.providers, INIT_PROVIDERS_STATE) as providerFilter[];

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

  function isNoFilterApplied() {
    const years = filterOfYears[0] === INIT_YEARS_STATE[0] && filterOfYears[1] === INIT_YEARS_STATE[1];
    const rating = filterOfRatings[0] === INIT_RATING_STATE[0] && filterOfRatings[1] === INIT_RATING_STATE[1];
    return filtersInStore.genre.length === 0 && filtersInStore.providers.length === 0 && sortOrder === INIT_SORT_ORDER && years && rating;
  }
  useEffect(() => {
    dispatch(sendUpdateFilterState(filtersInStore, sortOrder, filterOfProviders, filterOfRatings, filterOfYears, filterOfGenres));
  }, [sortOrder, filterOfProviders, filterOfRatings, filterOfYears, filterOfGenres]);
  useEffect(() => {
    if (!loading) {
      dispatch({ type: SearchPageActionTypes.UPDATE_LOADING_STATUS });
      if (isNoFilterApplied()) {
        getPopularMovies();
      } else {
        dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
      }
    }
  }, [filtersInStore]);
  const isBottom = (el: HTMLElement) => el.getBoundingClientRect().bottom <= window.innerHeight - footerIndent;
  const trackScrolling = useCallback(() => {
    const el = document.getElementById('movies-filtered-list') as HTMLElement;
    if (isBottom(el) && !loading) {
      dispatch({ type: SearchPageActionTypes.UPDATE_LOADING_STATUS });
      dispatch({ type: SearchPageActionTypes.UPDATE_PAGE_NUMBER });
      if (isNoFilterApplied()) {
        getPopularMovies();
      } else {
        dispatch({ type: SearchPageSagaTypes.FETCHFILTEREDSAGA });
      }
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
      <div className='filters'>
        <SortOrder setSortOrder={setSortOrder} sortOrder={sortOrder} sortsList={sortTypes} />
        <ProviderFilter setFilterOfProviders={setFilterOfProviders} filterOfProviders={filterOfProviders} providerList={providers} />
        <GenreFilters setFilterOfGenres={setFilterOfGenres} genreFilter={filterOfGenres} />
        <YearFilter setFilterOfYears={setFilterOfYears} filterOfYears={filterOfYears} />
        <RatingFilter setFilterOfRatings={setFilterOfRatings} filterOfRatings={filterOfRatings} />
      </div>
      <div id='movies-filtered-list'>
        <SearchPage movies={movies} />
      </div>
    </section>
  );
}
