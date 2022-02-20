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
import notFoundImg from '../../../Assets/img/NotFoundImg/notFound.svg';

interface FavoriteFilmCardType {
  id: number;
  posterPath: string;
  originalTitle: string;
  releaseDate: string;
  watchProviders: ListOfWatchProvidersType;
  voteAverage: number;
  genres: Array<{ id: number; name: string }>;
}

export function FavoriteFilmCard({ id, posterPath, originalTitle, releaseDate, watchProviders, voteAverage, genres }: FavoriteFilmCardType) {
  const link = `/movie/${id}`;
  const year = new Date(releaseDate).getFullYear();
  const transalteGenres = TranslateGenre(genres);
  const watchProvidersWithoutRepeats = GetListnotRepeatWatchProvidersWithSaveFields(watchProviders);

  return (
    <Card sx={{ width: '48%', marginTop: '2.4rem' }}>
      <Box sx={{ padding: '2.4rem', display: 'flex' }}>
        <Box sx={{ maxWidth: '17rem' }}>
          {posterPath ? (
            <NavLink to={link}>
              <img className='film-card__image' alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
            </NavLink>
          ) : (
            <img className='film-card__image' alt='not found img' src={notFoundImg} />
          )}
        </Box>
        <Box sx={{ marginLeft: '1.6rem' }}>
          <Typography variant='h4' sx={{ fontWeight: '600' }}>
            {originalTitle}({year})
          </Typography>
          <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.8rem' }} variant='subtitle1'>
            {transalteGenres.join(', ')}
          </Typography>
          <RatingDisplay evaluator='IMDb' rating={voteAverage} />
          {watchProvidersWithoutRepeats.length > 0 ? (
            <>
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
            </>
          ) : '' }

        </Box>
        <Paper elevation={3} />
      </Box>
    </Card>
  );
}
