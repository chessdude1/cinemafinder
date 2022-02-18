import { AuthPageActionsTypes, UserOperations, UserType } from './AuthPageActions';

const initialState = {
  isLogin: false,
  user: {
    isActivated: false,
    email: '1@mail.ru',
    favoriteFilms: ['123', '321'],
  },
};
type test = {
  isLogin: boolean,
  user : UserType
}

export function AuthPageReducer(
  state = initialState,
  action: AuthPageActionsTypes,
): test {
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
    case UserOperations.DELETEFAVOURITEFILM:
      const favoriteFilmsAfterDelete = state.user.favoriteFilms.filter((filmId) => filmId !== action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          favoriteFilms: favoriteFilmsAfterDelete,
        },
      };
    default:
      return state;
  }
}
