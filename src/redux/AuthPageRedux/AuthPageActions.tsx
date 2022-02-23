export enum UserOperations {
  SETUSER = 'SETUSER',
  SETFAVOURITEFILM = 'SETFAVOURITEFILM',
  SETISLOGIN = 'SETISLOGIN',
  DELETEFAVOURITEFILM = 'DELETEFAVOURITEFILM'
}

export interface UserType {
  _id?: string;
  name : string,
  isActivated: boolean,
  email : string,
  favoriteFilms: Array<string>,
  picture?: string
  id : string
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
  DeleteFavoriteFilm: (payload : string) : DeleteFavouriteFilmType => ({
    type: UserOperations.DELETEFAVOURITEFILM,
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

interface DeleteFavouriteFilmType {
  type : UserOperations.DELETEFAVOURITEFILM,
  payload : string
}

export type AuthPageActionsTypes = SetUserActionType |
 SetFavouriteFilmType | SetIsLoginActionType | DeleteFavouriteFilmType
