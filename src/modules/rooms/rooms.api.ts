import api from '@/services/api';
import { Room } from './rooms.types';

export const createRoomRequest = async (name: string) => {
  const { data } = await api.post<Room>('/rooms', {
    name,
  });
  return data;
};

export const joinRoomRequest = async (roomId: string) => {
  const { data } = await api.post(`/rooms/${roomId}/join`);
  return data;
};

export const getMyRoomsRequest = async () => {
  const { data } = await api.get<Room[]>('/rooms/me');
  return data;
};
