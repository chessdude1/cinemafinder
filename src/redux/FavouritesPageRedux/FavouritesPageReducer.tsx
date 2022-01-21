import { CountTypes, FavouritePageActionsType, FavouritePageStateType } from './FavouritePageActions';

const initialState : FavouritePageStateType = {
  number: 0,
};

export function FavouritesPageReducer(
  state = initialState,
  action: FavouritePageActionsType,
) {
  switch (action.type) {
    case CountTypes.INCREMENT:
      return { ...state, number: state.number + 1 };
    case CountTypes.DECREMENT:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
}
