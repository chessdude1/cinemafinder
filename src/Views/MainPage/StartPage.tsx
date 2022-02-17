import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Typography } from '@mui/material';

import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { SearchQueryAux } from '../SearchPage/SearchQuery/QueryAux';
import { CustomSwiper } from '../../Common/UI/CustomSwiper/CustomSwiper';

import './StartPageStyles.scss';

export function StartPage() {
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);

  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  const latestMovies = movies.filter((movie) => movie.release_date.slice(0, 4) === '2022');

  return (
    <div>
      <section className='search-block'>
        <div className='search-block__container'>
          <h1 className='search-block__heading'>
            Смотрите фильмы на площадках, которые у вас есть
          </h1>
          <SearchQueryAux inputPaddings={2} />
        </div>
      </section>
      <section className='latest-block'>
        <div className='latest-block__heading-wrapper'>
          <Typography variant='h2'>Новинки</Typography>
          <img src='img/heading-arrow.svg' alt='slide' />
        </div>
        <CustomSwiper slidesPerView={6} spaceBetween={30} movies={latestMovies} />
      </section>
      <section className='popular-block'>
        <div className='popular-block__heading-wrapper'>
          <Typography variant='h2'>Популярное</Typography>
          <img src='img/heading-arrow.svg' alt='slide' />
        </div>
        <CustomSwiper slidesPerView={6} spaceBetween={30} movies={movies} />
      </section>
    </div>
  );
}
