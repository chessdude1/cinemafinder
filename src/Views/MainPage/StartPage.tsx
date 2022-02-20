import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Typography } from '@mui/material';

import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { StartPageSagaTypes } from '../../redux/Sages/StartPageSaga';
import { CustomSwiper } from '../../Common/UI/CustomSwiper/CustomSwiper';
import headingArrow from '../../Assets/img/Swiper/heading-arrow.svg';

import './StartPageStyles.scss';

export function StartPage() {
  const popMovies = useTypedSelector((store) => store.StartPageReducer.movies);
  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: StartPageSagaTypes.FETCHPOPULARSAGA });
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  console.log(popMovies);

  const latestMovies = popMovies.filter((popMovie) => popMovie.release_date.slice(0, 4) === '2022');

  return (
    <div>
      <section className='search-block'>
        <div className='search-block__container'>
          <h1 className='search-block__heading'>
            Смотрите фильмы на площадках, которые у вас есть
          </h1>
        </div>
      </section>
      <section className='latest-block'>
        <div className='latest-block__heading-wrapper'>
          <Typography variant='h2'>Новинки</Typography>
          <img src={headingArrow} alt='slide' />
        </div>
        <CustomSwiper slidesPerView={6} spaceBetween={30} movies={latestMovies} />
      </section>
      <section className='popular-block'>
        <div className='popular-block__heading-wrapper'>
          <Typography variant='h2'>Популярное</Typography>
          <img src={headingArrow} alt='slide' />
        </div>
        <CustomSwiper slidesPerView={6} spaceBetween={30} movies={popMovies} />
      </section>
    </div>
  );
}
