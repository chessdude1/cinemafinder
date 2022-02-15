import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListOfWatchProvidersType } from '../../../../../Services/ServiceTypes';
import { WatchProvidersList } from '../../../../MoviePage/WatchProvidersList/WatchProvidersList';
import './MovieCardMedium.scss';

interface MovieCardMediumType {
  id: number;
  posterPath: string;
  originalTitle: string;
  year: string;
  genre: string;
  classStyle: string;
  rating: number;
  providers: ListOfWatchProvidersType;
}

export function MovieCardMedium({ id, posterPath, originalTitle, year, genre, classStyle, rating, providers }: MovieCardMediumType) {
  const link = `/movie/${id}`;
  let providersList = [...(providers.buy ? providers.buy : []), ...(providers.rent ? providers.rent : []), ...(providers.flatrate ? providers.flatrate : [])];
  providersList = providersList.filter((value, index, self) => index === self.findIndex((t) => t.provider_id === value.provider_id));
  return (
    <NavLink className={classStyle} to={link}>
      <img className='poster' alt={originalTitle} src={`https://image.tmdb.org/t/p/w342${posterPath}`} />
      <div className='description'>
        <h2>{originalTitle}</h2>
        <h3>
          <span>
            {year}
            {', '}
          </span>
          <span>{genre}</span>
          {', '}
          {rating}
          {', '}
          <WatchProvidersList listName='' watchProviders={providersList} />
        </h3>
      </div>
    </NavLink>
  );
}
