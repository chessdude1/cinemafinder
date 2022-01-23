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
  originalLanguage: string,
  originalTitle: string,
  posterPath: string,
  genres: Array<{id : number, name : string}>,
  backdropPath: string
  popularity: number,
  status : string,
  releaseDate: string
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
