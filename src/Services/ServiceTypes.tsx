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
  ads?: Array<onlineCinema>,
  flatrate?: Array<onlineCinema>,
  buy?: Array<onlineCinema>,
  rent?: Array<onlineCinema>
}
