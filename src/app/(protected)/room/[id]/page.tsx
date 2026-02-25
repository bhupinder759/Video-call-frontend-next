'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Room } from '@/modules/rooms/rooms.types';
import { Button } from '@/components/ui/button';
import { useSocket } from '@/hooks/useSockets';
import { useRoomSocket } from '@/hooks/useRoomSocket';
import { useWebRTC } from '@/hooks/useWebRTC';
import { useSocketStore } from '@/store/socket.store';
import { useCallStore } from '@/store/call.store';
import LocalVideo from '@/components/video/LocalVideo';
import RemoteVideo from '@/components/video/RemoteVideo';

export default function RoomPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isConnected = useSocketStore((s) => s.connected);
  const callStatus = useCallStore((s) => s.callStatus);

  useSocket();
  useRoomSocket(id);
  useWebRTC(id);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await api.get<Room>(`/rooms/${id}`);
        setRoom(data);
      } catch {
        setError('Room not found or inaccessible.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <div className="p-6">Loading room...</div>;

  if (error)
    return (
      <div className="p-6 space-y-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );

  if (!room?.isActive)
    return (
      <div className="p-6">
        <p className="text-yellow-500">This room is inactive.</p>
      </div>
    );

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex justify-between">
        <p>
          Socket:{' '}
          <span className={isConnected ? 'text-green-500' : 'text-red-500'}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </p>

        <p>
          Call Status: <span className="font-semibold">{callStatus}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LocalVideo />
        <RemoteVideo />
      </div>
    </div>
  );
}
