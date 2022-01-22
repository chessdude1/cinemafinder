export enum UserOperations {
  SETUSER = 'SETUSER'
}

interface UserType {
  id : number,
  name : string,
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
};

interface SetUserActionType {
  type : UserOperations.SETUSER,
  payload : UserType
}

export type AuthPageActionsTypes = SetUserActionType
