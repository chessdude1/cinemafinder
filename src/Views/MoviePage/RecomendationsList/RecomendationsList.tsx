import React from 'react';
import { filmResponse } from '../../../Services/ServiceTypes';
import { MovieCardSmall } from '../../SearchPage/MovieTable/MovieCard/MovieCardSmall';
import { GetGenresFromIds } from '../../../Auxiliary/GetGenresFromIds';
import './RecomendationsListStyles.scss';
import { TranslateGenre } from '../../../Auxiliary/TranslateGenre';

interface IRecomendationsList {
  similarFilms : Array<filmResponse> | undefined;
}

export function RecomendationsList({ similarFilms } : IRecomendationsList) {
  return (
    <div className='recomendation-list__wrapper'>
      {similarFilms?.map((similarFilm) => (
        <div key={similarFilm.id} className='recomendation-list__movie'>
          <MovieCardSmall
            originalTitle={similarFilm.original_title}
            genre={TranslateGenre((GetGenresFromIds(similarFilm.genre_ids))).join(' ')}
            year={String((new Date(similarFilm.release_date)).getFullYear())}
            posterPath={similarFilm.poster_path}
            id={similarFilm.id}
          />
        </div>
      ))}
    </div>
  );
}
