import { INCREMENT } from "./FavouritePageActions";
import { DECREMENT } from "./FavouritePageActions";

interface FavouritePageActionsType {
  type: string;
}

const initialState = {
  number: 0,
};

export const FavouritesPageReducer = (
  state = initialState,
  action: FavouritePageActionsType
) => {
  switch (action.type) {
    case INCREMENT:
      return state.number + 1;
    case DECREMENT:
      return state.number - 1;
    default:
      return state;
  }
};
