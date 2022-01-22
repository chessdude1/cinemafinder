import { FavouritePageActionTypes, FavouritePageActionsType, FavouritePageStateType } from './FavouritePageActions';

const initialState : FavouritePageStateType = {
  number: 0,
  films: [
    {
      id: 27046,
      original_language: 'ru',
      original_title: 'Ирония судьбы. Продолжение',
      poster_path: '/yzjLu5rTsIVHYmvMciUjmT3lJBc.jpg',
      genres: [
        {
          id: 35,
          name: 'Comedy',
        },
        {
          id: 10749,
          name: 'Romance',
        },
      ],
      backdrop_path: '/dQdzzIn4M8xPSzbTRhkbqRmEc54.jpg',
    },
  ],
};

export function FavouritesPageReducer(
  state = initialState,
  action: FavouritePageActionsType,
) {
  switch (action.type) {
    case FavouritePageActionTypes.INCREMENT:
      return { ...state, number: state.number + 1 };
    case FavouritePageActionTypes.DECREMENT:
      return { ...state, number: state.number - 1 };
    case FavouritePageActionTypes.ADDFAVOURITE:
      return { ...state, films: [...state.films, action.payload] };
    default:
      return state;
  }
}
