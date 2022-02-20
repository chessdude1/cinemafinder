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
    <Card className='movie-card__medium'>
      <Box className='card-medium__wrapper'>
        <Box className='poster__wrapper'>
          {posterPath ? (
            <NavLink to={link}>
              <img className='poster__image' alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
            </NavLink>
          ) : (
            <img className='poster__image' alt='not found img' src={notFoundImg} />
          )}
        </Box>
        <Box className='movie-description-wrapper'>
          <div className='movie-description__info'>
            <Typography variant='h4' sx={{ fontWeight: '600' }}>
              {originalTitle}({year})
            </Typography>

            <Typography sx={{ paddingTop: '0.2rem', paddingBottom: '0.8rem' }} variant='subtitle1'>
              {transalteGenres.join(', ')}
            </Typography>
            <div className='movie-card__rating'>
              <RatingDisplay evaluator='IMDb' rating={voteAverage} />
            </div>
          </div>
          {watchProvidersWithoutRepeats.length > 0 ? (
            <div className='movie-description__providers'>
              <Typography sx={{ fontWeight: '600' }} variant='h5'>
                Доступные площадки
              </Typography>
              <div className='film-card__providers-wrapper'>
                {watchProvidersWithoutRepeats.map((watchProvider) => (
                  <div key={watchProvider.provider_id}>
                    <img alt={watchProvider.provider_name} className='film-card__provider-image' src={`https://image.tmdb.org/t/p/w342${watchProvider.logo_path}`} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Typography sx={{ fontWeight: '600' }} variant='h5'>
              Доступные площадки не найдены
            </Typography>
          )}
        </Box>
        <Paper elevation={3} />
      </Box>
    </Card>
  );
}
