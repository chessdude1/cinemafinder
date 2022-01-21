import React from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { FavouritePageActions } from '../../redux/FavouritesPageRedux/FavouritePageActions';

export function FavouritesPage() {
  const number = useTypedSelector((store) => store.FavouritesPageReducer.number);
  const dispatch = useDispatch();
  function increment() {
    dispatch(FavouritePageActions.Increment());
  }
  function decrement() {
    dispatch(FavouritePageActions.Decrement());
  }
  return (
    <div>

      <h2>{number}</h2>
      <button type='button' aria-label='Save' onClick={() => { increment(); }} />
      <button type='button' aria-label='Save' onClick={() => { decrement(); }} />
    </div>
  );
}
