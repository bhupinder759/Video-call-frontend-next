'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMyRoomsRequest } from '../rooms.api';
import { Room } from '../rooms.types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Loader2,
  AlertCircle,
  MonitorPlay,
  History,
  ChevronRight,
} from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-zinc-400">
        <Loader2 className="w-8 h-8 mb-4 animate-spin text-indigo-500" />
        <p className="text-sm font-medium animate-pulse">
          Loading your spaces...
        </p>
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center max-w-sm p-6 text-center border bg-red-500/10 border-red-500/20 rounded-2xl">
          <AlertCircle className="w-10 h-10 mb-3 text-red-400" />
          <p className="font-medium text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  // 🔹 Empty State
  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center border-2 border-dashed rounded-2xl border-zinc-800/50 bg-zinc-950/20">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-zinc-900 shadow-inner">
          <MonitorPlay className="w-6 h-6 text-zinc-500" />
        </div>
        <h3 className="text-lg font-medium text-zinc-200">No rooms found</h3>
        <p className="max-w-xs mt-2 text-sm text-zinc-500">
          You haven't created or joined any video sessions yet. Use the forms to
          get started.
        </p>
      </div>
    );
  }

  // 🔹 Data State
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Recent Spaces</h2>
          <p className="text-sm text-zinc-400">Jump back into your meetings</p>
        </div>
        <span className="px-3 py-1 text-xs font-medium border rounded-full bg-zinc-800/50 text-zinc-400 border-zinc-700/50">
          {rooms.length} Total
        </span>
      </div>

      <div className="pr-2 space-y-3 overflow-y-auto">
        {rooms.map((room) => (
          <Card
            key={room.id}
            className={`flex items-center justify-between p-4 transition-all duration-300 border bg-zinc-950/50 group ${
              room.isActive
                ? 'border-zinc-800/80 hover:bg-zinc-900/80 hover:border-indigo-500/30'
                : 'border-zinc-800/40 opacity-80'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Room Icon */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                  room.isActive
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-500'
                }`}
              >
                {room.isActive ? (
                  <MonitorPlay className="w-5 h-5" />
                ) : (
                  <History className="w-5 h-5" />
                )}
              </div>

              {/* Room Details */}
              <div>
                <p
                  className={`font-semibold tracking-wide ${
                    room.isActive ? 'text-zinc-100' : 'text-zinc-400'
                  }`}
                >
                  {room.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {/* Status Indicator Dot */}
                  <span className="relative flex w-2 h-2">
                    {room.isActive && (
                      <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"></span>
                    )}
                    <span
                      className={`relative inline-flex w-2 h-2 rounded-full ${
                        room.isActive ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    ></span>
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      room.isActive
                        ? 'text-emerald-400/80'
                        : 'text-amber-500/80'
                    }`}
                  >
                    {room.isActive ? 'Active Now' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Enter Button */}
            <Button
              disabled={!room.isActive}
              onClick={() => router.push(`/room/${room.id}`)}
              className={`transition-all ${
                room.isActive
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_-3px_rgba(79,70,229,0.6)]'
                  : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
              }`}
            >
              Enter
              <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
