import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { FavouritePageActions } from '../../redux/FavouritesPageRedux/FavouritePageActions';
import { FavouritePageSagaTypes } from '../../redux/Sages/FavoritePageSaga';

export function FavouritesPage() {
  const number = useTypedSelector((store) => store.FavouritesPageReducer.number);
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

  return (
    <div>
      <button type='button' aria-label='Save' onClick={() => { increment(); }} />
      <button type='button' aria-label='Save' onClick={() => { decrement(); }} />
      <button type='button' aria-label='Save' onClick={() => { AddFavouriteFilm(); }} />
    </div>
  );
}
