import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import { Movie } from '../../../redux/SearchPageRedux/SearchPageActions';
import { MovieCardSmall } from '../../../Views/SearchPage/MovieTable/MovieCard/MovieCardSmall';
import { INIT_GENRES_STATE } from '../../../Views/SearchPage/Filters/InitialStates';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';

// Import Swiper styles
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';
import './CustomSwiperStyles.scss';
import { filmResponse } from '../../../Services/ServiceTypes';

interface ICustomSwiper {
  slidesPerView: number;
  spaceBetween: number;
  movies: Array<Movie> | Array<filmResponse>;
}

export function CustomSwiper({ slidesPerView, spaceBetween, movies }: ICustomSwiper) {
  function getGenreName(id: number) {
    const res = INIT_GENRES_STATE.find((genre) => genre.id === id);
    return res!.name;
  }

  function translate(ids: number[]) {
    const genresArray = ids.map((id) => ({ id, name: getGenreName(id) }));
    return TranslateGenre(genresArray);
  }

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      // eslint-disable-next-line react/jsx-boolean-value
      navigation={true}
      modules={[Pagination, Navigation]}
      className='mySwiper'
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        800: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1100: {
          slidesPerView,
          spaceBetween,
        },
      }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCardSmall
            title={movie.title}
            id={movie.id}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            year={movie.release_date.slice(0, 4)}
            genre={translate(movie.genre_ids).join(',')}
            classStyle='movie-card__small'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
