export enum FavouritePageActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  ADDFAVOURITE = 'ADDFAVOURITE'
}

export const FavouritePageActions = {
  Decrement: (): DecrementType => ({ type: FavouritePageActionTypes.DECREMENT }),
  Increment: (): IncrementType => ({ type: FavouritePageActionTypes.INCREMENT }),
  AddFavouriteFilm:
  (film : FavouriteFilm)
  : AddFavouriteFilm => ({ type: FavouritePageActionTypes.ADDFAVOURITE, payload: film }),
};

export interface FavouritePageStateType {
  number : number,
  films : Array<FavouriteFilm>
}

export interface FavouriteFilm {
  id: number,
  original_language: string,
  original_title: string,
  poster_path: string,
  genres: Array<{id : number, name : string}>,
  backdrop_path: string
}

interface DecrementType {
  type: FavouritePageActionTypes.DECREMENT;
}

interface IncrementType {
  type: FavouritePageActionTypes.INCREMENT;
}
interface AddFavouriteFilm {
  type : FavouritePageActionTypes.ADDFAVOURITE,
  payload : FavouriteFilm
}

export type FavouritePageActionsType = DecrementType | IncrementType | AddFavouriteFilm;
