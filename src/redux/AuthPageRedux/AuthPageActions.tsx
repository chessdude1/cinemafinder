export enum UserOperations {
  SETUSER = 'SETUSER',
  SETFAVOURITEFILM = 'SETFAVOURITEFILM'
}

interface UserType {
  id : number,
  password : string,
  email : string,
  subscribes : Array<string>,
  favorite_films : Array<string>
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
};

interface SetUserActionType {
  type : UserOperations.SETUSER,
  payload : UserType
}

interface SetFavouriteFilmType {
  type : UserOperations.SETFAVOURITEFILM,
  payload : string
}

export type AuthPageActionsTypes = SetUserActionType | SetFavouriteFilmType
