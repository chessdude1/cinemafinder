import React from 'react';
import { NavLink } from 'react-router-dom';
import { filmResponse } from '../../../Services/ServiceTypes';
import './RecomendationsListStyles.scss';

interface IRecomendationsList {
  similarFilms : Array<filmResponse> | undefined
}

export function RecomendationsList({ similarFilms } : IRecomendationsList) {
  return (
    <div className='recomendation-list__wrapper'>
      {similarFilms?.map((similarFilm) => (

        <NavLink key={similarFilm.id} to={`/movie/${similarFilm.id}`}>
          <div>
            <h2>{similarFilm.title}</h2>
            <img alt='similar-film' src={`https://image.tmdb.org/t/p/w342${similarFilm.poster_path}`} />
            <p>{similarFilm.vote_average}</p>
            {/* <button type='submit'>Добавить в избранное</button> */}
          </div>
        </NavLink>
      ))}
    </div>
  );
}
