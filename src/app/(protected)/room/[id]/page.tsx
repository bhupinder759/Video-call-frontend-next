'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Room } from '@/modules/rooms/rooms.types';
import { Button } from '@/components/ui/button';

export default function RoomPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await api.get<Room>(`/rooms/${id}`);
        setRoom(data);
      } catch (err) {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold">{room.name}</h1>

      <p className="text-sm text-gray-500">Room ID: {room.id}</p>

      {/* WebRTC will go here in F5 */}
    </div>
  );
}
