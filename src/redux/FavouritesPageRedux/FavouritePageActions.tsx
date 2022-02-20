import { ListOfWatchProvidersType } from '../../Services/ServiceTypes';

export enum FavouritePageActionTypes {
  ADDFAVOURITE = 'ADDFAVOURITE'
}

export const FavouritePageActions = {
  AddFavouriteFilm:
  (film : Array<FavouriteFilm>)
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
  backdropPath: string | null,
  popularity: number,
  status : string,
  releaseDate: string,
  voteAverage : number,
  watchProviders : ListOfWatchProvidersType,
  titleTranslated ?: string,
  overviewTranslated ?: string
}

interface AddFavouriteFilm {
  type : FavouritePageActionTypes.ADDFAVOURITE,
  payload : Array<FavouriteFilm>
}

export type FavouritePageActionsType = AddFavouriteFilm;
