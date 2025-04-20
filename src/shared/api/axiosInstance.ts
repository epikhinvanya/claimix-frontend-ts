import axios from 'axios';

const api = axios.create({
  baseURL: 'http://test.claimix.ru/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
