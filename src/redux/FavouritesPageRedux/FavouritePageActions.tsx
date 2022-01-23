export enum FavouritePageActionTypes {
  ADDFAVOURITE = 'ADDFAVOURITE'
}

export const FavouritePageActions = {
  AddFavouriteFilm:
  (film : FavouriteFilm)
  : AddFavouriteFilm => ({ type: FavouritePageActionTypes.ADDFAVOURITE, payload: film }),
};

export interface FavouritePageStateType {
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
  releaseDate: string,
  voteAverage : number
}

interface AddFavouriteFilm {
  type : FavouritePageActionTypes.ADDFAVOURITE,
  payload : FavouriteFilm
}

export type FavouritePageActionsType = AddFavouriteFilm;
