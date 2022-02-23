import axios, { AxiosResponse } from 'axios';
import $api from './Interceptors';
import { IAuthResponse,
  IUser, WatchProvidersResponseType,
  ListOfWatchProvidersType,
  MovieWithAdditionalInformation } from './ServiceTypes';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export async function getPopularMovies(pageNum = 1, timespan = 'week', language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const movieResponse = await instance.get(`trending/movie/${timespan}?api_key=${apiKey}&language=${language}&page=${pageNum}`);
  return movieResponse.data.results;
}

export async function getMoviesWithFilter(
  withGenres = '',
  startYear = 1900,
  endYear = 2022,
  bottomRating = 0,
  topRating = 10,
  watchProviders = '',
  sortBy = 'popularity.desc',
  pageNum = 1,
  watchRegion = 'RU',
  language = 'en-US',
  apiKey = 'a48c1568134ff7732653e3df2aee4eaf',
) {
  let gstr = '';
  if (withGenres) {
    gstr = '&with_genres=';
  }
  let pstr = '';
  if (watchProviders) {
    pstr = '&with_watch_providers=';
  }

  const movieResponse = await instance.get(
    `discover/movie?api_key=${apiKey}&language=${language}${gstr}${withGenres}&vote_average.gte=${bottomRating}&vote_average.lte=${topRating}&include_adult=false&release_date.gte=${startYear}&release_date.lte=${endYear}&vote_count.gte=1000${pstr}${watchProviders}&watch_region=${watchRegion}&sort_by=${sortBy}&page=${pageNum}`,
  );

  return movieResponse.data.results;
}
export async function getMovieByQuery(query: string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const movieResponse = await instance.get(`search/movie?api_key=${apiKey}&language=${language}&query=${query}`);
  return movieResponse.data.results;
}
export async function getMovie(id: string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const movieOriginalLanguageResponse = await instance.get(`movie/${id}?api_key=${apiKey}&language=en-US`);
  let movieUserLanguageResponse = movieOriginalLanguageResponse;
  if (language !== 'en-US') {
    movieUserLanguageResponse = await instance.get(`movie/${id}?api_key=${apiKey}&language=${language}`);
    return {
      ...movieOriginalLanguageResponse.data,
      titleTranslated: movieUserLanguageResponse.data.title,
      overviewTranslated: movieUserLanguageResponse.data.overview,
    };
  }
  return movieOriginalLanguageResponse.data;
}
export async function getSimilarMovies(id: string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const similarFilms = await instance.get(`movie/${id}/similar?api_key=${apiKey}&language=${language}`);
  return similarFilms.data.results;
}

export async function getWatchProvidersList(language = 'en-US', watchRegion = 'ru', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  const providersResponse = await instance.get(`/watch/providers/movie?api_key=${apiKey}&language=${language}&watch_region=${watchRegion}`);
  return providersResponse.data.results;
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
        rent: responseListOfProviders.data.results.RU.rent,
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

export async function login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
  return $api.post<IAuthResponse>('/login', { email, password });
}

export async function registration(email: string, password: string, name : string): Promise<AxiosResponse<IAuthResponse>> {
  return $api.post<IAuthResponse>('/registration', { email, password, name });
}

export function registrationUserFormData(email: string, password: string, name : string, file : File | string): Promise<AxiosResponse<IAuthResponse>> {
  if (
    typeof file === 'string'
  ) {
    return $api.post<IAuthResponse>('/registration', { email, password, name });
  }
  const formData = new FormData();
  formData.append('picture', file);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('name', name);
  return $api.post<IAuthResponse>('/registration', formData);
}

export async function logout(): Promise<void> {
  return $api.post('/logout');
}

export async function fetchUser() : Promise<IUser> {
  const user = await $api.get('/user');
  return user.data;
}

export function postUser(user: IUser): Promise<AxiosResponse<IUser>> {
  return $api.post<IUser>('/user', { user });
}

export function changePicture(id: string | undefined, file : File | string): Promise<AxiosResponse<IUser>> {
  const formData = new FormData();
  formData.append('picture', file);
  if (id) {
    formData.append('id', id);
  }
  return $api.post<IUser>('/user/picture', formData);
}

export function changePassword(id: string | undefined, password : string): Promise<AxiosResponse<IUser>> {
  const formData = new FormData();
  formData.append('password', password);
  if (id) {
    formData.append('id', id);
  }

  return $api.post<IUser>('/user/password', formData);
}
