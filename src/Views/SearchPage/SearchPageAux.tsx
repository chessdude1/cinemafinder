import React, { useCallback, useEffect, useState } from 'react';
import _, { divide } from 'lodash';
import { Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchPageActionTypes } from '../../redux/SearchPageRedux/SearchPageActions';
import { GenreFilters } from './Filters/GenreFilters';
import { ProviderFilter } from './Filters/ProviderFilter';
import { RatingFilter } from './Filters/RatingFilter';
import { SortOrder } from './Filters/SortOrder';
import { YearFilter } from './Filters/YearFilter';
import { getStateFromStore, sendUpdateFilterState } from './FilterStateUpdates';
import { SearchPage } from './MovieTable/SearchPage';
import { IGenre, providerFilter, sortTypes } from './SearchQueryTypes';
import { INIT_GENRES_STATE, INIT_PROVIDERS_STATE, INIT_RATING_STATE, INIT_SORT_ORDER, INIT_YEARS_STATE } from './Filters/InitialStates';
import { CustomResetButton } from '../../Common/UI/CustomResetButton/CustomResetButton';
import './SearchPage.scss';
import { ADAPTIVE_BREAK_POINT } from '../../Auxiliary/Constants';
import { TemporaryDrawer } from '../../Common/UX/Drawer/Drawer';
import { AdaptiveDrawer } from './Filters/AdaptiveFilterDrawer/AdaptiveFilterDrawer';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { SearchQueryAux } from './SearchQuery/QueryAux';

interface IFilter {
  sort: string;
  provider: providerFilter[];
  ratings: number[];
  years: number[];
  genres: IGenre[];
}
export function SearchPageAux() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  const [isDrawerOpen, setDrawer] = useState<boolean>(false);

  const providers = useTypedSelector((store) => store.SearchPageReducer.providersList);
  const pageNumber = useTypedSelector((store) => store.SearchPageReducer.pageNumber);
  const loading = useTypedSelector((store) => store.SearchPageReducer.isLoading);
  const allLoaded = useTypedSelector((store) => store.SearchPageReducer.isAllLoaded);
  const filtersInStore = useTypedSelector((store) => store.SearchPageReducer.filters);

  const initGenresState = getStateFromStore(filtersInStore.genre, INIT_GENRES_STATE) as IGenre[];
  const initProvidersState = getStateFromStore(filtersInStore.providers, INIT_PROVIDERS_STATE) as providerFilter[];

  const [filterOfGenres, setFilterOfGenres] = useState(initGenresState);
  const [filterOfProviders, setFilterOfProviders] = useState<providerFilter[]>(initProvidersState);
  const [filterOfYears, setFilterOfYears] = useState<number[]>(filtersInStore.year);
  const [filterOfRatings, setFilterOfRatings] = useState<number[]>(filtersInStore.rating);
  const [sortOrder, setSortOrder] = useState(filtersInStore.sortOrder);

  const dispatch = useDispatch();
  function updateFilterState({ sort, provider, ratings, years, genres }: IFilter) {
    dispatch(sendUpdateFilterState(filtersInStore, sort, provider, ratings, years, genres));
  }
  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }
  function getProvidersList() {
    dispatch({ type: SearchPageSagaTypes.FETCHPROVIDERSSAGA });
  }
  const delayedQuery = useCallback(
    _.debounce((filters) => updateFilterState(filters), 500),
    [],
  );
  function isNoFilterApplied() {
    const years = filterOfYears[0] === INIT_YEARS_STATE[0] && filterOfYears[1] === INIT_YEARS_STATE[1];
    const rating = filterOfRatings[0] === INIT_RATING_STATE[0] && filterOfRatings[1] === INIT_RATING_STATE[1];
    return filtersInStore.genre.length === 0 && filtersInStore.providers.length === 0 && sortOrder === INIT_SORT_ORDER && years && rating;
  }
  useEffect(() => {
    const filters = { sort: sortOrder, provider: filterOfProviders, ratings: filterOfRatings, years: filterOfYears, genres: filterOfGenres };
    updateFilterState(filters);
  }, [sortOrder, filterOfProviders, filterOfGenres]);
  useEffect(() => {
    const filters = { sort: sortOrder, provider: filterOfProviders, ratings: filterOfRatings, years: filterOfYears, genres: filterOfGenres };
    delayedQuery(filters);
  }, [filterOfRatings, filterOfYears]);
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
  const isBottom = (el: HTMLElement) => el.getBoundingClientRect().bottom <= window.innerHeight;
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
  function resetFilters() {
    setFilterOfGenres(INIT_GENRES_STATE);
    setFilterOfProviders(INIT_PROVIDERS_STATE);
    setFilterOfYears(INIT_YEARS_STATE);
    setFilterOfRatings(INIT_RATING_STATE);
    setSortOrder(INIT_SORT_ORDER);
  }
  return (
    <section className='search-page'>
      {dimensions.width > ADAPTIVE_BREAK_POINT ? (
        <div className='search-page__ui'>
          <div className='search-page__filters'>
            <SortOrder windowSize={dimensions.width} setSortOrder={setSortOrder} sortOrder={sortOrder} sortsList={sortTypes} />
            <ProviderFilter windowSize={dimensions.width} setFilterOfProviders={setFilterOfProviders} filterOfProviders={filterOfProviders} providerList={providers} />
            <GenreFilters windowSize={dimensions.width} setFilterOfGenres={setFilterOfGenres} genreFilter={filterOfGenres} />
            <YearFilter windowSize={dimensions.width} setFilterOfYears={setFilterOfYears} filterOfYears={filterOfYears} />
            <RatingFilter windowSize={dimensions.width} setFilterOfRatings={setFilterOfRatings} filterOfRatings={filterOfRatings} />
          </div>
          <div className='search-page__button'>
            <CustomResetButton type='button' variant='outlined' content='reset' onClick={() => resetFilters()} />
          </div>
        </div>
      ) : (
        <div className='search-page__ui'>
          <div className='search-filter-wrapper'>
            <SearchQueryAux inputPaddings={1} />
            <CustomButton type='button' onClick={() => setDrawer(true)} variant='outlined'>
              Фильтры
            </CustomButton>
          </div>
          <TemporaryDrawer isDrawerOpen={isDrawerOpen} setDrawer={setDrawer}>
            <div className='search-page__drawer'>
              <div className='search-page__drawer-header'>
                <Typography variant='h3' sx={{ fontWeight: '600', marginTop: '1rem', marginBottom: '1rem' }}>
                  Фильтры
                </Typography>
                <CustomButton type='button' onClick={() => setDrawer(false)} variant='contained'>
                  <ArrowBackIcon />
                </CustomButton>
              </div>
              <div className='search-page__filters'>
                <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '2rem', marginBottom: '0.5rem' }}>
                  Провайдеры
                </Typography>
                <ProviderFilter windowSize={dimensions.width} setFilterOfProviders={setFilterOfProviders} filterOfProviders={filterOfProviders} providerList={providers} />
                <Divider />
                <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '2rem', marginBottom: '0.5rem' }}>
                  Жанры
                </Typography>
                <GenreFilters windowSize={dimensions.width} setFilterOfGenres={setFilterOfGenres} genreFilter={filterOfGenres} />
                <Divider />
                <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '2rem', marginBottom: '0.5rem' }}>
                  Год
                </Typography>
                <YearFilter windowSize={dimensions.width} setFilterOfYears={setFilterOfYears} filterOfYears={filterOfYears} />
                <Divider />
                <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '2rem', marginBottom: '0.5rem' }}>
                  Рейтинг
                </Typography>
                <RatingFilter windowSize={dimensions.width} setFilterOfRatings={setFilterOfRatings} filterOfRatings={filterOfRatings} />
                <Divider />
                <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '2rem', marginBottom: '0.5rem' }}>
                  Порядок сортировки
                </Typography>
                <SortOrder windowSize={dimensions.width} setSortOrder={setSortOrder} sortOrder={sortOrder} sortsList={sortTypes} />
                <Divider />
              </div>
              <div className='search-page__button'>
                <CustomResetButton type='button' variant='outlined' content='reset all' onClick={() => resetFilters()} />
              </div>
            </div>
          </TemporaryDrawer>
        </div>
      )}

      <div id='movies-filtered-list'>
        <SearchPage />
      </div>
    </section>
  );
}
