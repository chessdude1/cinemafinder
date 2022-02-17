import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';

import './StartPageStyles.scss';

import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { SearchPageSagaTypes } from '../../redux/Sages/SearchPageSaga';
import { MovieCardSmall } from '../SearchPage/MovieTable/MovieCard/MovieCardSmall';
import { TranslateGenre } from '../../Auxiliary/TranslateGenre';
import { INIT_GENRES_STATE } from '../SearchPage/Filters/InitialStates';
import { SearchQueryAux } from '../SearchPage/SearchQuery/QueryAux';

export function StartPage() {
  const movies = useTypedSelector((store) => store.SearchPageReducer.movies);

  const dispatch = useDispatch();

  function getPopularMovies() {
    dispatch({ type: SearchPageSagaTypes.FETCHPOPULARSAGA });
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  console.log(movies);

  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res!.name;
  }

  function translate(ids: number[]) {
    const genresArray = ids.map((id) => ({ id, name: getGenreName(id) }));
    return TranslateGenre(genresArray);
  }

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
      <h2>Новинки</h2>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        // eslint-disable-next-line react/jsx-boolean-value
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        {movies.map((el) => (
          <SwiperSlide key={el.id}>
            <MovieCardSmall
              id={el.id}
              posterPath={el.poster_path}
              originalTitle={el.original_title}
              year={el.release_date.slice(0, 4)}
              genre={translate(el.genre_ids).join(',')}
              classStyle='movie-card__small'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
