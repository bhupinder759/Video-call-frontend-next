import api from '@/services/api';

export const getTurnCredentials = async () => {
  const { data } = await api.get('/turn-credentials');
  return data;
};
