import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { FavouriteFilm, FavouritePageActions } from '../../redux/FavouritesPageRedux/FavouritePageActions';
import { FavouritePageSagaTypes } from '../../redux/Sages/FavoritePageSaga';
import { FavouritesPage } from './FavouritesPage';

export function FavouritesPageAux() {
  const films = useTypedSelector((store) => store.FavouritesPageReducer.films);

  const dispatch = useDispatch();
  function increment() {
    dispatch(FavouritePageActions.Increment());
  }

  function decrement() {
    dispatch(FavouritePageActions.Decrement());
  }

  function AddFavouriteFilm() {
    dispatch({ type: FavouritePageSagaTypes.ADDFAVOURITESAGA });
  } // init saga worker

  useEffect(() => {
    AddFavouriteFilm();
  }, []);

  console.log(films);
  return (
    <FavouritesPage favoriteFilms={films} />
  );
}
