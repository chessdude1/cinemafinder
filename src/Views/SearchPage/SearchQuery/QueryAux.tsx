import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomSearchField } from '../../../Common/UI/CustomSearchField';
import { useTypedSelector } from '../../../Hooks/useTypedSelector';
import { SearchQuerySagaTypes } from '../../../redux/Sages/SearchQuerySaga';
import { INIT_GENRES_STATE } from '../Filters/InitialStates';
import { SearchQueryResult } from './QueryResult';
import './QueryStyle.scss';

export function SearchQueryAux() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const movies = useTypedSelector((store) => store.SearchQueryReducer.movies);
  const dispatch = useDispatch();
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res?.name;
  }
  useEffect(() => {
    if (searchQuery.length !== 0) {
      dispatch({ type: SearchQuerySagaTypes.FETCH_QUERY_SAGA, payload: searchQuery });
    }
  }, [searchQuery]);

  return (
    <div>
      <CustomSearchField
        key='search-field'
        id='header-search-field'
        dependentValue={movies}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder='Movie name'
      />
      <div className='query-results'>
        {movies.map((movie) => (
          <SearchQueryResult key={movie.id} title={movie.title} posterPath={movie.poster_path} genres={movie.genre_ids.map((id) => getGenreName(id.id)).join(',')} />
        ))}
      </div>
    </div>
  );
}
