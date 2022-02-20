import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { TranslateGenre } from '../../Auxiliary/TranslateGenre';
import { RatingDisplay } from '../../Common/UX/RatingDisplay/RatingDisplay';
import { filmResponse, onlineCinema } from '../../Services/ServiceTypes';
import { RecomendationsList } from './RecomendationsList/RecomendationsList';
import { WatchProvidersList } from './WatchProvidersList/WatchProvidersList';
import './MoviePageStyles.scss';
import { ConverTime } from '../../Auxiliary/ConvertTime';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { CustomSwiper } from '../../Common/UI/CustomSwiper/CustomSwiper';

interface IMoviePage {
  genres : Array<{id: number, name : string}> | undefined;
  voteAverage : number | undefined;
  title: string | undefined;
  posterPath: string | undefined;
  releaseYear : string;
  adsWatchProviders : Array<onlineCinema> | undefined;
  buyWatchProviders : Array<onlineCinema> | undefined;
  flatrateWatchProviders : Array<onlineCinema> | undefined;
  rentWatchProviders : Array<onlineCinema> | undefined;
  overview : string | undefined;
  similarFilms : Array<filmResponse> | undefined;
  currentMovieId : string;
  runtime : number | undefined;
  setNewFavoriteFilm: (filmId : string) => void;
  isFilmAlreadyInFavourites: boolean;
  deleteFilmFromFavorite: (filmId : string) => void;
  isLogin: boolean;
}

export function MoviePage({
  isLogin,
  isFilmAlreadyInFavourites,
  genres,
  voteAverage,
  title,
  posterPath,
  releaseYear,
  adsWatchProviders,
  buyWatchProviders,
  flatrateWatchProviders,
  rentWatchProviders,
  overview,
  similarFilms,
  currentMovieId,
  runtime,
  setNewFavoriteFilm,
  deleteFilmFromFavorite,
} : IMoviePage) {
  const translatedGenres = TranslateGenre(genres);
  const isEmpty = !(adsWatchProviders || flatrateWatchProviders || buyWatchProviders || rentWatchProviders);
  return (
    <main className='movie-page'>
      <section className='movie-page__poster'>
        <img className='movie-page__poster_img' src={`https://image.tmdb.org/t/p/w342${posterPath}`} alt='backdrop path' />
        <Box>
          <Grid sx={{ marginBottom: '2rem', marginTop: '1rem' }} container spacing={2}>
            <Grid item xs={4}>
              <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                Рейтинг:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <RatingDisplay evaluator='IMDb' rating={voteAverage} />
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                Время:
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                {ConverTime(runtime) }
              </Typography>
            </Grid>
          </Grid>
          {isLogin ? (isFilmAlreadyInFavourites ? (
            <CustomButton
              variant='contained'
              onClick={() => {
                deleteFilmFromFavorite(currentMovieId);
              }}
              type='submit'
            >
              Удалить из избранного
            </CustomButton>
          ) : (
            <CustomButton
              variant='contained'
              onClick={() => {
                setNewFavoriteFilm(currentMovieId);
              }}
              type='submit'
            >
              В избранное
            </CustomButton>
          )) : '' }
        </Box>
      </section>
      <section className='movie-description'>
        <Typography sx={{ fontWeight: '600' }} variant='h2'>
          {title}
          (
          {releaseYear}
          )
        </Typography>
        <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
          {translatedGenres?.join(', ')}
        </Typography>
        <Box sx={{ marginTop: '3.2rem' }}>
          {isEmpty ? (
            <Typography variant='h4' sx={{ fontWeight: '600' }}>Данный фильм недоступен в онлайн кинотеатрах</Typography>
          ) : (
            <>
              {flatrateWatchProviders ? <WatchProvidersList movieName={title} listName='Бесплатно по подписке' watchProviders={flatrateWatchProviders} /> : ''}
              {adsWatchProviders ? <WatchProvidersList movieName={title} listName='C рекламой' watchProviders={adsWatchProviders} /> : ''}
              { buyWatchProviders ? <WatchProvidersList movieName={title} listName='Для покупки' watchProviders={buyWatchProviders} /> : ''}
              {rentWatchProviders ? <WatchProvidersList movieName={title} listName='В аренду' watchProviders={rentWatchProviders} /> : ''}
            </>
          ) }

        </Box>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '3.2rem' }}>
            Описание
          </Typography>
          <Typography sx={{ marginTop: '0.8rem' }} variant='h5'>
            {overview}
          </Typography>
        </Box>
        <Box>
          <Typography variant='h4' sx={{ fontWeight: '600', marginTop: '4rem', marginBottom: '1.6rem' }}>
            Похожие фильмы
          </Typography>
          <Box sx={{ maxWidth: '60vw' }}>
            {similarFilms ? <CustomSwiper movies={similarFilms} slidesPerView={5} spaceBetween={30} /> : '' }
          </Box>
        </Box>
      </section>
    </main>
  );
}
