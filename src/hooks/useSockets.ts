'use client';

import { useEffect } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '@/services/sockets';
import { useAuthStore } from '@/store/auth.store';
import { useSocketStore } from '@/store/socket.store';

export const useSocket = () => {
  const token = useAuthStore((state) => state.accessToken);

  const setConnected = useSocketStore((state) => state.setConnected);

  const currentRoomId = useSocketStore((state) => state.currentRoomId);

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token);

    const handleConnect = () => {
      setConnected(true);

      // 🔥 Auto rejoin room after reconnect
      if (currentRoomId) {
        socket.emit('join-room', {
          roomId: currentRoomId,
        });
      }
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    socket.io.on('reconnect', (attempt) => {
      console.log('Reconnected after', attempt);
    });

    socket.io.on('error', (err) => {
      console.error('Manager error:', err);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);

      socket.io.off('reconnect');
      socket.io.off('error');

      disconnectSocket();
    };
  }, [token, currentRoomId, setConnected]);
};
