import {
  SearchPageActionTypes,
  SearchPageActionsType,
  SearchPageStateType,
  Movie,
} from './SearchPageActions';

const initialState: SearchPageStateType = {
  movies: [
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

export function SearchPageReducer(
  state: SearchPageStateType = initialState,
  action: SearchPageActionsType,
) {
  switch (action.type) {
    case SearchPageActionTypes.FILTER:
      return { ...state, movies: [...state.movies, action.payload] };
    case SearchPageActionTypes.FETCH_POPULAR:
      return { ...state, movies: [...state.movies, action.payload] };
    default:
      return state;
  }
}
