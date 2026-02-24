import api from '@/services/api';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const refreshRequest = async () => {
  const { data } = await api.post('/auth/refresh');
  return data;
};
