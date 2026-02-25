import CreateRoomForm from '@/modules/rooms/components/CreateRoomForm';
import JoinRoomForm from '@/modules/rooms/components/JoinRoomForm';
import RoomsList from '@/modules/rooms/components/RoomsList';
import Link from 'next/link';

export default function DashboardPage() {
  <Link href="/dashboard">Go to Dashboard</Link>;
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <CreateRoomForm />
      <JoinRoomForm />
      <RoomsList />
    </div>
  );
}
