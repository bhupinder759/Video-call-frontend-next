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

import {
  Loader2,
  AlertCircle,
  AlertTriangle,
  Wifi,
  WifiOff,
  Activity,
  ArrowLeft,
} from 'lucide-react';

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

  // 🔹 Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-400">
        <Loader2 className="w-10 h-10 mb-4 animate-spin text-indigo-500" />
        <p className="text-sm font-medium animate-pulse">
          Connecting to secure room...
        </p>
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-zinc-950">
        <div className="flex flex-col items-center max-w-md p-8 text-center border bg-zinc-900/50 backdrop-blur-xl border-zinc-800/50 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-red-500/10">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-zinc-100">
            Connection Failed
          </h2>
          <p className="mb-8 text-zinc-400">{error}</p>
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // 🔹 Inactive State
  if (!room?.isActive) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-zinc-950">
        <div className="flex flex-col items-center max-w-md p-8 text-center border bg-zinc-900/50 backdrop-blur-xl border-zinc-800/50 rounded-2xl shadow-2xl">
          <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-amber-500/10">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="mb-2 text-xl font-bold text-zinc-100">
            Room Inactive
          </h2>
          <p className="mb-8 text-zinc-400">
            This video session has been closed or is no longer active.
          </p>
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // 🔹 Main Video Room UI
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[120px]" />
      </div>

      {/* Top Header Controls */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4 border-b md:px-6 bg-zinc-950/80 backdrop-blur-md border-zinc-800/50">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">
              {room.name || 'Video Session'}
            </h1>
            <p className="text-xs text-zinc-500 font-mono">ID: {id}</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3">
          {/* Socket Status Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-full bg-zinc-900/50 border-zinc-800/50">
            {isConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-300">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-red-400" />
                <span className="text-zinc-400">Disconnected</span>
              </>
            )}
          </div>

          {/* Call Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border rounded-full bg-indigo-500/10 border-indigo-500/20">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-indigo-300 capitalize">
              {callStatus || 'Waiting'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Video Grid Area */}
      <main className="relative z-10 flex-1 p-4 md:p-6 flex flex-col justify-center">
        <div className="w-full max-w-6xl mx-auto">
          {/* Grid expands to 2 columns on medium screens. 
            Aspect-video ensures the containers maintain a standard 16:9 camera shape.
          */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {/* Local Video Container */}
            <div className="relative flex items-center justify-center overflow-hidden border shadow-xl bg-zinc-900/40 backdrop-blur-sm border-zinc-800/50 rounded-2xl aspect-video group">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-zinc-600 font-medium z-0">
                  Local Camera Loading...
                </p>
              </div>
              <div className="relative z-10 w-full h-full">
                <LocalVideo />
              </div>
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 text-xs font-medium rounded-md bg-black/60 text-zinc-200 backdrop-blur-md border border-white/10">
                You
              </div>
            </div>

            {/* Remote Video Container */}
            <div className="relative flex items-center justify-center overflow-hidden border shadow-xl bg-zinc-900/40 backdrop-blur-sm border-zinc-800/50 rounded-2xl aspect-video group">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-zinc-600 font-medium z-0">
                  Waiting for remote video...
                </p>
              </div>
              <div className="relative z-10 w-full h-full">
                <RemoteVideo />
              </div>
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 text-xs font-medium rounded-md bg-black/60 text-zinc-200 backdrop-blur-md border border-white/10">
                Remote User
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
