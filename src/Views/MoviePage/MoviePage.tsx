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
  notRepeatedProviders : Array<string>;
  similarFilms : Array<filmResponse> | undefined;
  AddFilmToUserFavourite : (filmId : string) => void;
  currentMovieId : string;
  runtime : number | undefined;
  setNewFavoriteFilm: (filmId : string) => void
}

export function MoviePage({
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
  notRepeatedProviders,
  similarFilms,
  AddFilmToUserFavourite,
  currentMovieId,
  runtime,
  setNewFavoriteFilm,
} : IMoviePage) {
  const translatedGenres = TranslateGenre(genres);

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
          <CustomButton
            variant='contained'
            onClick={() => {
              setNewFavoriteFilm(currentMovieId);
            }}
            type='submit'
          >
            В избранное

          </CustomButton>
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
          {adsWatchProviders ? <WatchProvidersList listName='C рекламой' watchProviders={adsWatchProviders} /> : ''}
          { buyWatchProviders ? <WatchProvidersList listName='Для покупки' watchProviders={buyWatchProviders} /> : ''}
          {rentWatchProviders ? <WatchProvidersList listName='В аренду' watchProviders={rentWatchProviders} /> : ''}
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
          <RecomendationsList
            similarFilms={similarFilms}
          />
        </Box>
      </section>
    </main>
  );
}
