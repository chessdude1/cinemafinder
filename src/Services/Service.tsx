import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export function getMovie(id : string, language = 'en-US', apiKey = 'a48c1568134ff7732653e3df2aee4eaf') {
  return instance.get(`movie/${id}?api_key=${apiKey}&language=${language}`);
}
