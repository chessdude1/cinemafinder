export interface WatchProvidersResponseType {
  data : {
  id: number,
  results: {
    RU?: {
      link: string,
        ads?: Array<onlineCinema>,
        flatrate?: Array<onlineCinema>,
        buy?: Array<onlineCinema>,
        rent?: Array<onlineCinema>,
      }
    }
  }
} // one cinema can be in multiple tabs for example more TV ib ads and in buy

export interface onlineCinema {
  display_priority: number,
  logo_path: string,
  provider_id: number,
  provider_name: string
}

export interface ListOfWatchProvidersType {
  ads ?: Array<onlineCinema>,
  flatrate?: Array<onlineCinema>,
  buy?: Array<onlineCinema>,
  rent?: Array<onlineCinema>
}

export interface MovieWithAdditionalInformation {
  adult: boolean,
  backdrop_path: string,
  genres: Array<{id: number, name : string}>,
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  runtime : number,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  similarFilms : Array< filmResponse>,
  spoken_languages: Array<{english_name: string,
  iso_639_1: string,
  homepage : string,
  overview : string,
  budget : number,
  name: string}>,
  status : string,
  tagline : string,
  production_companies : Array<{id : number, logo_path: string}>,
  production_countries : Array<{name : string}>,
  watchProviders : ListOfWatchProvidersType,
  titleTranslated?: string,
  overviewTranslated?: string
}

export interface filmResponse{
  adult: boolean,
  backdrop_path: string,
  genre_ids: Array<number>,
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

export interface IUser {
  name : string;
  id: string;
  password?: string;
  __v?: 0;
  activationLink?: string;
  isActivated: boolean,
  email : string,
  favoriteFilms: Array<string>,
  picture?: string
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
