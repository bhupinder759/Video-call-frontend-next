import CreateRoomForm from '@/modules/rooms/components/CreateRoomForm';
import JoinRoomForm from '@/modules/rooms/components/JoinRoomForm';
import RoomsList from '@/modules/rooms/components/RoomsList';
import Link from 'next/link';
import { Video, LogOut, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30">
      {/* Background Gradients (Fixed so they don't scroll) */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      {/* Top Navigation */}
      <nav className="relative z-10 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)]">
              <Video className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              ConnectHQ
            </span>
          </div>

          {/* Sign Out Action */}
          <Link href="/">
            <Button
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="relative z-10 px-6 py-10 mx-auto max-w-7xl md:py-12">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 border rounded-xl bg-zinc-900/50 border-zinc-800/50 shadow-[0_0_20px_-5px_rgba(79,70,229,0.2)]">
            <LayoutGrid className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Manage your spaces and join active video sessions.
            </p>
          </div>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Actions (Create & Join Forms) */}
          <div className="space-y-8 lg:col-span-4">
            <div className="p-6 border rounded-2xl border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl shadow-lg">
              <CreateRoomForm />
            </div>

            <div className="p-6 border rounded-2xl border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl shadow-lg">
              <JoinRoomForm />
            </div>
          </div>

          {/* Right Column: Rooms List */}
          <div className="lg:col-span-8">
            <div className="h-full p-6 border rounded-2xl border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl shadow-lg min-h-[500px]">
              <RoomsList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
