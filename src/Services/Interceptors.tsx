import axios from 'axios';
import { IAuthResponse } from './ServiceTypes';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const configRequest = config;
  configRequest.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401
      && error.config
      // eslint-disable-next-line no-underscore-dangle
      && !error.config._isRetry
    ) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  },
);

export default $api;
