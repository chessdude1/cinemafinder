import { Box, Card, Paper, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { GetListnotRepeatWatchProvidersWithSaveFields } from '../../../../../Auxiliary/GetListnotRepeatWatchProviders';
import { TranslateGenre } from '../../../../../Auxiliary/TranslateGenre';
import { RatingDisplay } from '../../../../../Common/UX/RatingDisplay/RatingDisplay';
import { ListOfWatchProvidersType } from '../../../../../Services/ServiceTypes';
import notFoundImg from '../../../../../Assets/img/NotFoundImg/notFound.svg';
import { WatchProvidersList } from '../../../../MoviePage/WatchProvidersList/WatchProvidersList';
import './MovieCardMedium.scss';

interface MovieCardMediumType {
  id: number;
  posterPath: string;
  originalTitle: string;
  year: string;
  genre: { id: number; name: string }[];
  rating: number;
  providers: ListOfWatchProvidersType;
}

export function MovieCardMedium({ id, posterPath, originalTitle, year, genre, rating, providers }: MovieCardMediumType) {
  const link = `/movie/${id}`;
  const yearRelease = new Date(year).getFullYear();
  const transalteGenres = TranslateGenre(genre);
  const watchProvidersWithoutRepeats = GetListnotRepeatWatchProvidersWithSaveFields(providers);
  let providersList = [...(providers.buy ? providers.buy : []), ...(providers.rent ? providers.rent : []), ...(providers.flatrate ? providers.flatrate : [])];
  providersList = providersList.filter((value, index, self) => index === self.findIndex((t) => t.provider_id === value.provider_id));
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
              {originalTitle}({yearRelease})
            </Typography>

            <Typography sx={{ paddingTop: '0.2rem', paddingBottom: '0.8rem' }} variant='subtitle1'>
              {transalteGenres.join(', ')}
            </Typography>
            <div className='movie-card__rating'>
              <RatingDisplay evaluator='IMDb' rating={rating} />
            </div>
          </div>
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
        </Box>
        <Paper elevation={3} />
      </Box>
    </Card>
    // <NavLink className={classStyle} to={link}>
    //   <img className='poster' alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
    //   <div className='description'>
    //     <h2>{originalTitle}</h2>
    //     <h3>
    //       <span>
    //         {year}
    //         {', '}
    //       </span>
    //       <span>{genre}</span>
    //       {', '}
    //       {rating}
    //       {', '}
    //       <WatchProvidersList listName='' watchProviders={providersList} />
    //     </h3>
    //   </div>
    // </NavLink>
  );
}
