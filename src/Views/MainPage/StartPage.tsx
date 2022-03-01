import React, { ChangeEvent, useEffect, useState } from 'react';
import _ from 'lodash';
import { Typography } from '@mui/material';

import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { CustomSwiper } from '../../Common/UI/CustomSwiper/CustomSwiper';
import headingArrow from '../../Assets/img/Swiper/heading-arrow.svg';

import './StartPageStyles.scss';
import { getPopularMovies } from '../../Services/Service';
import { Movie } from '../../redux/SearchPageRedux/SearchPageActions';

export function StartPage() {
  const initalMovies = useTypedSelector((store) => store.SearchPageReducer.movies);
  const [popularMovies, setPopularMovies] = useState<Array<Movie>>(initalMovies);

  async function getPopularMoviesForStartPage() {
    const popularMoviesForStartPage = await getPopularMovies(1, 'week', 'ru');

    setPopularMovies(popularMoviesForStartPage);
  }

  useEffect(() => {
    getPopularMoviesForStartPage();
  }, []);

  const latestMovies = popularMovies.filter((movie) => movie.release_date.slice(0, 4) === '2022');

  return (
    <div>
      <section className='search-block'>
        <div className='search-block__container'>
          <div className='search-block__content'>
            <Typography variant='h1' sx={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              Смотрите фильмы на площадках, которые у вас есть
            </Typography>
          </div>
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
        <CustomSwiper slidesPerView={6} spaceBetween={30} movies={popularMovies} />
      </section>
    </div>
  );
}
