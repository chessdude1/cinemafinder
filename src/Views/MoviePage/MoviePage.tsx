import React from 'react';
import { TranslateGenre } from '../../Auxiliary/TranslateGenre';
import { filmResponse, onlineCinema } from '../../Services/ServiceTypes';
import './MoviePageStyles.scss';
import { RecomendationsList } from './RecomendationsList/RecomendationsList';
import { WatchProvidersList } from './WatchProvidersList/WatchProvidersList';

interface IMoviePage {
  genres : Array<{id: number, name : string}> | undefined;
  voteAverage : number | undefined;
  voteCount : number | undefined;
  title: string | undefined;
  backdropPath: string | undefined;
  releaseYear : string;
  adsWatchProviders : Array<onlineCinema> | undefined;
  buyWatchProviders : Array<onlineCinema> | undefined;
  flatrateWatchProviders : Array<onlineCinema> | undefined;
  rentWatchProviders : Array<onlineCinema> | undefined;
  overview : string | undefined;
  notRepeatedProviders : Array<string>
  similarFilms : Array<filmResponse> | undefined
}

export function MoviePage({
  genres,
  voteAverage,
  voteCount,
  title,
  backdropPath,
  releaseYear,
  adsWatchProviders,
  buyWatchProviders,
  flatrateWatchProviders,
  rentWatchProviders,
  overview,
  notRepeatedProviders,
  similarFilms,
} : IMoviePage) {
  const translatedGenres = TranslateGenre(genres);

  return (
    <main className='movie-page'>
      <section className='poster'>
        <div>
          <img src={`https://image.tmdb.org/t/p/w342${backdropPath}`} alt='12' />
        </div>
        <button type='submit'>Добавить в избранное</button>
        <p>
          Rating :
          {voteAverage}
          /
          {voteCount}
        </p>
        <p>
          Жанр :
          {translatedGenres?.join(', ')}
        </p>
      </section>
      <section className='movie-description'>
        <h2>{`${title} ${releaseYear}`}</h2>
        <div>
          <h2>Смотрите прямо сейчас</h2>
          {adsWatchProviders ? <WatchProvidersList listName='Реклама' watchProviders={adsWatchProviders} /> : ''}
          { buyWatchProviders ? <WatchProvidersList listName='Купить' watchProviders={buyWatchProviders} /> : ''}
          {flatrateWatchProviders ? <WatchProvidersList listName='Бесплатно' watchProviders={flatrateWatchProviders} /> : ''}
          {rentWatchProviders ? <WatchProvidersList listName='Аренда' watchProviders={rentWatchProviders} /> : ''}
        </div>
        <div>
          <h2>Описание</h2>
          {overview}
        </div>
        <div>
          <h2>
            Вы можете смотреть
            {title}
            {adsWatchProviders ? 'С рекламой' : '' }
            {flatrateWatchProviders ? 'Бесплатно' : '' }
            {rentWatchProviders ? 'Арендовать' : '' }
          </h2>
          {`В настоящее время вы можете смотреть ${title} на ${notRepeatedProviders.join(', ')}`}
        </div>
        <div>
          <RecomendationsList similarFilms={similarFilms} />
        </div>
      </section>
    </main>
  );
}
