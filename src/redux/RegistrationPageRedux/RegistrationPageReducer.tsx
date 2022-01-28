import { RegistrationPageActionsTypes, UserOperations } from './RegistrationPageActions';

const initialState = {
  isLogin: true,
  user: {
    id: 1,
    name: 'user',
    password: 'user',
    email: 'test@test.ru',
    subscribes: ['More TV', 'Кинопоиск HD'],
    favorite_films: ['27046', '421892', '808'],
  },
  // mock user
};

export function RegistrationPageReducer(
  state = initialState,
  action: RegistrationPageActionsTypes,
): typeof initialState {
  switch (action.type) {
    case UserOperations.SETUSER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
