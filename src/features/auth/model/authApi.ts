import api from '../../../shared/api/axiosInstance';

export const login = async (data) => {
  const response = await api.post('/auth/login/', data);
  const token = response.data.key;
  sessionStorage.setItem('token', token);
  return token;
};

export const register = async (data) => {
  const response = await api.post('/auth/register/', data);
  const token = response.data.key;
  sessionStorage.setItem('token', token);
  return token;
};
