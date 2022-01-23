import { FavouritePageActionTypes, FavouritePageActionsType, FavouritePageStateType } from './FavouritePageActions';

const initialState : FavouritePageStateType = {
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
      voteAverage: 4.8,
    },
  ],
};

export function FavouritesPageReducer(
  state = initialState,
  action: FavouritePageActionsType,
) {
  switch (action.type) {
    case FavouritePageActionTypes.ADDFAVOURITE:
      return { ...state, films: [...state.films, action.payload] };
    default:
      return state;
  }
}
