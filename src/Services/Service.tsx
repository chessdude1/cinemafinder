import axios from 'axios';
import { WatchProvidersResponseType, ListOfWatchProvidersType, MovieWithAdditionalInformation } from './ServiceTypes';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export async function getPopularMovies(timespan = 'week', language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf', pageNum = 1) {
  const movieResponse = await instance.get(`trending/movie/${timespan}?api_key=${apiKey}&language=${language}&page=${pageNum}`);
  return movieResponse.data.results;
}

export async function getMoviesWithFilter(
  withGenres = '',
  startYear = 1900,
  endYear = 2022,
  bottomRating = 0,
  topRating = 10,
  sortBy = 'popularity.desc',
  language = 'en-US',
  apiKey = 'a48c1568134ff7732653e3df2aee4eaf',
  pageNum = 1,
) {
  const movieResponse = await instance.get(
    `discover/movie?api_key=${apiKey}&language=${language}&with_genres=${withGenres}&vote_average.gte=${bottomRating}&vote_average.lte=${topRating}&include_adult=false&release_date.gte=${startYear}&release_date.lte=${endYear}&sort_by=${sortBy}&page=${pageNum}`,
  );

  return movieResponse.data.results;
}

export async function getMovie(id: string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const movieResponse = await instance.get(`movie/${id}?api_key=${apiKey}&language=${language}`);
  return movieResponse.data;
}
export async function getSimilarMovies(id: string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const similarFilms = await instance.get(`movie/${id}/similar?api_key=${apiKey}&language=${language}`);
  return similarFilms.data.results;
}

export async function getWatchProviders(id: string, apiKey = 'a48c1568134ff7732653e3df2aee4eaf'): Promise<ListOfWatchProvidersType> {
  const responseListOfProviders: WatchProvidersResponseType = await instance.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`);
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

export async function getMovieWithAdditionalInformation(id: string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf'): Promise<MovieWithAdditionalInformation> {
  const movieResponse = await getMovie(id, language, apiKey);
  const watchProviders = await getWatchProviders(id, apiKey);
  const similarFilms = await getSimilarMovies(id, language, apiKey);
  return {
    ...movieResponse,
    watchProviders,
    similarFilms,
  };
}
