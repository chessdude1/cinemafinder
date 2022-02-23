import React from 'react';
import { NavLink } from 'react-router-dom';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { onlineCinema } from '../../../Services/ServiceTypes';

import { generateLinkToMovie } from '../../../Auxiliary/generateLinkToMovie';

import './WatchProviderListStyles.scss';

interface IWatchProvidersList {
 listName : string,
 watchProviders : Array<onlineCinema>,
 movieName: string | undefined
}

export function WatchProvidersList(
  { listName, watchProviders, movieName } : IWatchProvidersList,
) {
  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography variant='h4' sx={{ fontWeight: '600' }}>{listName}</Typography>
      <div className='watch-provider-list'>
        {watchProviders.map((watchProvider) => (
          <a target='_blank' href={`${generateLinkToMovie(movieName, watchProvider.provider_id)}`} rel='noreferrer'>
            <div className='watch-provider-list__watch-provider' key={watchProvider.provider_id}>
              <img className='watch-provider-list__watch-provider_img' alt='watch provider' height='100px' src={`https://image.tmdb.org/t/p/w342${watchProvider.logo_path}`} />
            </div>
          </a>
        ))}
      </div>
    </Box>
  );
}
