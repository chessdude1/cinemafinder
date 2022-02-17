import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { onlineCinema } from '../../../Services/ServiceTypes';
import './WatchProviderListStyles.scss';

interface IWatchProvidersList {
 listName : string,
 watchProviders : Array<onlineCinema>
}

export function WatchProvidersList(
  { listName, watchProviders } : IWatchProvidersList,
) {
  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography variant='h4' sx={{ fontWeight: '600' }}>{listName}</Typography>
      <div className='watch-provider-list'>
        {watchProviders.map((watchProvider) => (
          <div className='watch-provider-list__watch-provider' key={watchProvider.provider_id}>
            <img className='watch-provider-list__watch-provider_img' alt='watch provider' height='100px' src={`https://image.tmdb.org/t/p/w342${watchProvider.logo_path}`} />
          </div>
        ))}
      </div>
    </Box>
  );
}
