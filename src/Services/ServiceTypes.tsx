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

interface onlineCinema {
  display_priority: number,
  logo_path: number,
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
  similarFilms : Array< filmResponse>,
  spoken_languages: Array<{english_name: string,
  iso_639_1: string,
  runtime : number,
  homepage : string,
  overview : string,
  budget : number,
  name: string}>,
  status : string,
  tagline : string,
  production_companies : Array<{id : number, logo_path: string}>
  production_countries : Array<{name : string}>
  watchProviders : Array<MovieWithAdditionalInformation>
}

interface filmResponse{
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
