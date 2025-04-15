import axios from 'axios';

const api = axios.create({
  baseURL: 'http://claimix.localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
