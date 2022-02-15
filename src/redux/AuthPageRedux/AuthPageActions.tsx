export enum UserOperations {
  SETUSER = 'SETUSER',
  SETFAVOURITEFILM = 'SETFAVOURITEFILM',
  SETISLOGIN = 'SETISLOGIN'
}

export interface UserType {
  isActivated: boolean,
  email : string,
  favoriteFilms: Array<string>,
  picture?: string
}

export const AuthPageActions = {
  SetUser: (user : UserType) : SetUserActionType => ({
    type: UserOperations.SETUSER,
    payload: user,
  }),
  SetFavoriteFilm: (payload : string) : SetFavouriteFilmType => ({
    type: UserOperations.SETFAVOURITEFILM,
    payload,
  }),
  SetIsLogin: (payload : boolean) : SetIsLoginActionType => ({
    type: UserOperations.SETISLOGIN,
    payload,
  }),
};

interface SetUserActionType {
  type : UserOperations.SETUSER,
  payload : UserType
}

interface SetIsLoginActionType {
  type : UserOperations.SETISLOGIN,
  payload : boolean
}

interface SetFavouriteFilmType {
  type : UserOperations.SETFAVOURITEFILM,
  payload : string
}

export type AuthPageActionsTypes = SetUserActionType | SetFavouriteFilmType | SetIsLoginActionType
