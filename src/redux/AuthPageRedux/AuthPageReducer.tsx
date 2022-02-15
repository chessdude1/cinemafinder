import { AuthPageActionsTypes, UserOperations, UserType } from './AuthPageActions';

const initialState = {
  isLogin: false,
  user: {
    isActivated: false,
    email: '1@mail.ru',
    favoriteFilms: ['123', '321'],
  },

};

export function AuthPageReducer(
  state = initialState,
  action: AuthPageActionsTypes,
): typeof initialState {
  switch (action.type) {
    case UserOperations.SETISLOGIN:
      return { ...state, isLogin: action.payload };
    case UserOperations.SETUSER:
      return { ...state, user: action.payload };
    case UserOperations.SETFAVOURITEFILM:
      const favoriteFilmsWithoutRepeats = Array.from(
        new Set([...state.user.favoriteFilms, action.payload]),
      );
      return {
        ...state,
        user: {
          ...state.user,
          favoriteFilms: favoriteFilmsWithoutRepeats,
        },
      };
    default:
      return state;
  }
}
