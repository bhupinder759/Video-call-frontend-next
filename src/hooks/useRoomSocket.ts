'use client';

import { useEffect, useRef } from 'react';
import { getSocket } from '@/services/sockets';
import { useSocketStore } from '@/store/socket.store';

export const useRoomSocket = (roomId: string) => {
  const setCurrentRoomId = useSocketStore((state) => state.setCurrentRoomId);

  const joinedRef = useRef(false);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // 🔹 Prevent duplicate join
    if (!joinedRef.current) {
      socket.emit('join-room', { roomId });
      joinedRef.current = true;
      setCurrentRoomId(roomId);
    }

    const handleUserJoined = (data: { userId: string }) => {
      console.log('User joined:', data.userId);
    };

    const handleUserLeft = (data: { userId: string }) => {
      console.log('User left:', data.userId);
    };

    socket.on('user-joined', handleUserJoined);
    socket.on('user-left', handleUserLeft);

    return () => {
      // 🔥 Leave room on unmount
      socket.emit('leave-room', { roomId });

      socket.off('user-joined', handleUserJoined);
      socket.off('user-left', handleUserLeft);

      joinedRef.current = false;
      setCurrentRoomId(null);
    };
  }, [roomId, setCurrentRoomId]);
};
