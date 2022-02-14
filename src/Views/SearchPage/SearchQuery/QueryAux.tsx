import _ from 'lodash';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';
import { CustomSearchField } from '../../../Common/UI/CustomSearchField';
import { useTypedSelector } from '../../../Hooks/useTypedSelector';
import { SearchQuerySagaTypes } from '../../../redux/Sages/SearchQuerySaga';
import { SearchQueryActionTypes } from '../../../redux/SearchPageRedux/SearchQueryRedux/SearchQueryActions';
import { INIT_GENRES_STATE } from '../Filters/InitialStates';
import { MovieCardSmall } from '../MovieTable/MovieCard/MovieCardSmall';
import { QueryResultPopup } from './QueryPopup/QueryResultPopup';
import './QueryStyle.scss';

export function SearchQueryAux() {
  const [focused, setFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const movies = useTypedSelector((store) => store.SearchQueryReducer.movies);
  const loading = useTypedSelector((store) => store.SearchQueryReducer.isLoading);
  const dispatch = useDispatch();
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res!.name;
  }
  function translate(ids: number[]) {
    const genresArray = ids.map((id) => ({ id, name: getGenreName(id) }));
    return TranslateGenre(genresArray);
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
      <CustomSearchField setFocus={setFocused} key='search-field' id='header-search-field' searchResult={movies} searchInput={searchQuery} onChange={onChange} placeholder='Movie name' />
      {focused && movies.length > 0 ? (
        <div className='query-results'>
          {movies.map((movie) => (
            <MovieCardSmall
              classStyle='movie-card__popup'
              key={movie.id}
              year={movie.release_date.slice(0, 4)}
              originalTitle={movie.title}
              id={movie.id}
              posterPath={movie.poster_path}
              genre={translate(movie.genre_ids).join(',')}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
