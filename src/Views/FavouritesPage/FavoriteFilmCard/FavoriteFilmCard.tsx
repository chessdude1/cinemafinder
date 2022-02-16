import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ListOfWatchProvidersType } from '../../../Services/ServiceTypes';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';
import { RatingDisplay } from '../../../Common/UX/RatingDisplay/RatingDisplay';
import './FavouriteFilmCard.scss';
import { GetListnotRepeatWatchProvidersWithSaveFields } from '../../../Auxiliary/GetListnotRepeatWatchProviders';

interface FavoriteFilmCardType {
  id : number,
  posterPath: string,
  originalTitle : string,
  releaseDate: string,
  watchProviders: ListOfWatchProvidersType,
  voteAverage: number,
  genres: Array<{id: number, name: string}>;
}

export function FavoriteFilmCard({ id, posterPath, originalTitle,
  releaseDate,
  watchProviders,
  voteAverage,
  genres } : FavoriteFilmCardType) {
  const link = `/movie/${id}`;
  const year = (new Date(releaseDate)).getFullYear();
  const transalteGenres = TranslateGenre(genres);
  const watchProvidersWithoutRepeats = GetListnotRepeatWatchProvidersWithSaveFields(watchProviders);

  return (
    <Card sx={{ width: '48%' }}>
      <Box sx={{ padding: '2.4rem', display: 'flex' }}>
        <Box sx={{ maxWidth: '17rem' }}>
          {
          posterPath ? (
            <img
              className='film-card__image'
              alt={originalTitle}
              src={`https://image.tmdb.org/t/p/w342${posterPath}`}
            />
          )
            : <img alt='not found img' src='https://icdn.lenta.ru/images/2019/11/01/13/20191101130724350/square_1280_88f54b592eb591cd6252313b5ec3e06d.png' />
        }
        </Box>
        <Box sx={{ marginLeft: '1.6rem' }}>
          <Typography variant='h4' sx={{ fontWeight: '600' }}>
            {originalTitle}

            (
            {year}
            )
          </Typography>
          <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.8rem' }} variant='subtitle1'>
            {transalteGenres.join(', ')}
          </Typography>
          <RatingDisplay evaluator='IMDb' rating={voteAverage} />
          <Typography sx={{ fontWeight: '600', marginTop: '9.7rem', marginBottom: '0.4rem' }} variant='h5'>
            Доступные площадки
          </Typography>
          <div className='film-card__providers-wrapper'>
            {watchProvidersWithoutRepeats.map((watchProvider) => (
              <div key={watchProvider.provider_id}>
                <img alt={watchProvider.provider_name} className='film-card__provider-image' src={`https://image.tmdb.org/t/p/w342${watchProvider.logo_path}`} />
              </div>
            ))}
          </div>
        </Box>
        <Paper elevation={3} />
      </Box>
    </Card>
  );
}
