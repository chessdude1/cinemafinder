import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthPageActions } from '../../../redux/AuthPageRedux/AuthPageActions';
import { filmResponse } from '../../../Services/ServiceTypes';
import { MovieCardSmall } from '../../SearchPage/MovieTable/MovieCard/MovieCardSmall';
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
        <div className="recomendation-list__movie">
          <MovieCardSmall
            originalTitle={similarFilm.original_title}
            genre='Экшн'
            year='2001'
            posterPath={similarFilm.poster_path}
            id={similarFilm.id}
            key={similarFilm.id}
          />
        </div>
      ))}
    </div>
  );
}
