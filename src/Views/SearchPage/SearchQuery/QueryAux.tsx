import _ from 'lodash';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomSearchField } from '../../../Common/UI/CustomSearchField';
import { useTypedSelector } from '../../../Hooks/useTypedSelector';
import { SearchQuerySagaTypes } from '../../../redux/Sages/SearchQuerySaga';
import { SearchQueryActionTypes } from '../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { INIT_GENRES_STATE } from '../Filters/InitialStates';
import { SearchQueryResult } from './QueryResult';
import './QueryStyle.scss';

export function SearchQueryAux() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const movies = useTypedSelector((store) => store.SearchQueryReducer.movies);
  const loading = useTypedSelector((store) => store.SearchQueryReducer.isLoading);
  const dispatch = useDispatch();
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res?.name;
  }
  function dispatchQuery(query: string) {
    if (query.length !== 0) {
      dispatch({ type: SearchQuerySagaTypes.FETCH_QUERY_SAGA, payload: query });
    } else {
      dispatch({ type: SearchQueryActionTypes.CLEAN_QUERY_CONTAINER });
    }
  }

  const delayedQuery = useCallback(
    _.debounce((q) => dispatchQuery(q), 500),
    [],
  );
  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    delayedQuery(e.target.value);
  };
  return (
    <div>
      <CustomSearchField key='search-field' id='header-search-field' searchResult={movies} searchInput={searchQuery} onChange={onChange} placeholder='Movie name' />
      <div className='query-results'>
        {movies.map((movie) => (
          <SearchQueryResult key={movie.id} title={movie.title} id={movie.id} posterPath={movie.poster_path} genres={movie.genre_ids.map((id) => getGenreName(id)).join(',')} />
        ))}
      </div>
    </div>
  );
}
