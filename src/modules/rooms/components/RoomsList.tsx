'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyRoomsRequest } from '../rooms.api';
import { Room } from '../rooms.types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await getMyRoomsRequest();
        setRooms(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message ?? 'Failed to load rooms.');
        } else {
          setError('Unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Loading rooms...
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  // 🔹 Empty State
  if (rooms.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No rooms yet. Create one!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <Card key={room.id} className="p-4 flex justify-between items-center">
          <div>
            <p
              className={`font-semibold ${
                !room.isActive ? 'text-gray-400' : ''
              }`}
            >
              {room.name}
            </p>

            {!room.isActive && (
              <p className="text-xs text-yellow-500">Inactive</p>
            )}
          </div>

          <Button
            disabled={!room.isActive}
            onClick={() => router.push(`/room/${room.id}`)}
          >
            Enter
          </Button>
        </Card>
      ))}
    </div>
  );
}
