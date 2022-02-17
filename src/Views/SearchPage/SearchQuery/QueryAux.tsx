import _ from 'lodash';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';
import { CustomSearchField } from '../../../Common/UI/CustomSearchField';
import { useTypedSelector } from '../../../Hooks/useTypedSelector';
import { SearchQuerySagaTypes } from '../../../redux/Sages/SearchQuerySaga';
import { SearchQueryActionTypes } from '../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { INIT_GENRES_STATE } from '../Filters/InitialStates';
import { MovieCardSmall } from '../MovieTable/MovieCard/MovieCardSmall';
import { QueryResultPopupAux } from './QueryPopup/QueryPopupAux';

import './QueryStyle.scss';

interface ISearchQueryAux {
  inputPaddings: number
}

export function SearchQueryAux({ inputPaddings }: ISearchQueryAux) {
  const [focused, setFocused] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const movies = useTypedSelector((store) => store.SearchQueryReducer.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  function dispatchQuery(query: string) {
    if (query.length !== 0) {
      dispatch({ type: SearchQuerySagaTypes.FETCH_QUERY_SAGA, payload: query });
    } else {
      dispatch({ type: SearchQueryActionTypes.CLEAN_QUERY_CONTAINER });
    }
  }
  const loadQueryPage = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (searchQuery && e.key === 'Enter') {
      dispatch({ type: SearchQuerySagaTypes.FETCH_QUERY_PROVIDERS_SAGA });
      setFocused(false);
      return navigate('/query');
    }
    return 1;
  };
  const delayedQuery = useCallback(
    _.debounce((q) => dispatchQuery(q), 100),
    [],
  );
  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    delayedQuery(e.target.value);
  };
  return (
    <div>
      <CustomSearchField
        resultContainer={ref}
        setFocus={setFocused}
        onKeyDown={loadQueryPage}
        key='search-field'
        id='header-search-field'
        searchResult={movies}
        searchInput={searchQuery}
        onChange={onChange}
        placeholder='Movie name'
        inputPaddings={inputPaddings}
      />
      {focused && movies.length > 0 ? <QueryResultPopupAux focused={focused} setFocus={setFocused} movies={movies} /> : ''}
    </div>
  );
}
