import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthPageActions } from '../../../redux/AuthPageRedux/AuthPageActions';
import { filmResponse } from '../../../Services/ServiceTypes';
import './RecomendationsListStyles.scss';

interface IRecomendationsList {
  similarFilms : Array<filmResponse> | undefined;
}

export function RecomendationsList({ similarFilms } : IRecomendationsList) {
  const dispatch = useDispatch();

  const AddFilmToUserFavourite = (filmId : string) => {
    dispatch(AuthPageActions.SetFavoriteFilm(filmId));
  };

  return (
    <div className='recomendation-list__wrapper'>
      {similarFilms?.map((similarFilm) => (
        <NavLink key={similarFilm.id} to={`/movie/${similarFilm.id}`}>
          <div>
            <h2>{similarFilm.title}</h2>
            <img alt='similar-film' src={`https://image.tmdb.org/t/p/w342${similarFilm.poster_path}`} />
            <p>{similarFilm.vote_average}</p>
            <button onClick={() => { AddFilmToUserFavourite(String(similarFilm.id)); }} type='submit'>Добавить в избранное</button>
          </div>
        </NavLink>
      ))}
    </div>
  );
}
