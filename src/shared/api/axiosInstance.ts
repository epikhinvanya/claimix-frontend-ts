import axios from 'axios';

const api = axios.create({
  baseURL: 'http://test.claimix.ru',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      sessionStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post('http://test.claimix.ru/api/token/refresh/', {
          refresh: sessionStorage.getItem('refresh'),
        });

        const newAccess = res.data.access;
        sessionStorage.setItem('token', newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        sessionStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
