import React from 'react';
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
    <div>
      <h2>{listName}</h2>
      <div className='watch-provider-list'>
        {watchProviders.map((watchProvider) => (
          <div key={watchProvider.provider_id}>
            <h2>{watchProvider.provider_name}</h2>
            <img alt='watch provider' height='100px' src={`https://image.tmdb.org/t/p/w342${watchProvider.logo_path}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
