import axios from 'axios';
import { WatchProvidersResponseType, ListOfWatchProvidersType } from './ServiceTypes';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export async function getMovie(id : string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const movieResponse = await instance.get(`movie/${id}?api_key=${apiKey}&language=${language}`);
  return movieResponse.data;
}

export async function getWatchProviders(id : string, apiKey = 'a48c1568134ff7732653e3df2aee4eaf') : Promise<ListOfWatchProvidersType> {
  const responseListOfProviders : WatchProvidersResponseType = await instance.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`);
  let listOfProviders = {};
  if (responseListOfProviders.data.results.RU) {
    if (responseListOfProviders.data.results.RU.buy) {
      listOfProviders = {
        ...listOfProviders,
        buy: responseListOfProviders.data.results.RU.buy,
      };
    }
    if (responseListOfProviders.data.results.RU.flatrate) {
      listOfProviders = {
        ...listOfProviders,
        flatrate: responseListOfProviders.data.results.RU.flatrate,
      };
    }
    if (responseListOfProviders.data.results.RU.rent) {
      listOfProviders = {
        ...listOfProviders,
        flatrate: responseListOfProviders.data.results.RU.rent,
      };
    }
    if (responseListOfProviders.data.results.RU.ads) {
      listOfProviders = {
        ...listOfProviders,
        ads: responseListOfProviders.data.results.RU.ads,
      };
    }
  }
  return listOfProviders;
}
