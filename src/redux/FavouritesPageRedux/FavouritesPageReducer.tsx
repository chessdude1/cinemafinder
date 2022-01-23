import { FavouritePageActionTypes, FavouritePageActionsType, FavouritePageStateType } from './FavouritePageActions';

const initialState : FavouritePageStateType = {
  number: 0,
  films: [
    {
      id: 27046,
      originalLanguage: 'ru',
      originalTitle: 'Ирония судьбы. Продолжение',
      posterPath: '/yzjLu5rTsIVHYmvMciUjmT3lJBc.jpg',
      popularity: 5.072,
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
      backdropPath: '/dQdzzIn4M8xPSzbTRhkbqRmEc54.jpg',
      status: 'Released',
      releaseDate: '2007-12-21',
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
