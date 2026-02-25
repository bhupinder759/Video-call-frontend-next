import { io, Socket } from 'socket.io-client';
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from '@/types/socket.types';

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const connectSocket = (
  token: string,
): Socket<ServerToClientEvents, ClientToServerEvents> => {
  if (socket) return socket;

  const url = process.env.NEXT_PUBLIC_SOCKET_URL;

  if (!url) {
    throw new Error('NEXT_PUBLIC_SOCKET_URL is not defined');
  }

  socket = io(`${url}/video`, {
    auth: { token },
    transports: ['websocket'], // avoid long polling
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 10000,
  });

  // 🔹 Optional: connection lifecycle logging
  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
  });

  socket.io.on('reconnect', (attempt) => {
    console.log(`Socket reconnected after ${attempt} attempts`);
  });

  socket.io.on('reconnect_attempt', (attempt) => {
    console.log(`Reconnect attempt #${attempt}`);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = (): void => {
  if (!socket) return;

  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
};
