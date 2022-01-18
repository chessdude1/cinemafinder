import axios from 'axios';

const instance = axios.create({
  baseURL: 'insert base URL',
  headers: {
    'API-KEY': 'inset your API key',
  },
});
