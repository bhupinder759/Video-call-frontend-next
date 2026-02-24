'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { joinRoomSchema } from '../rooms.schema';
import { joinRoomRequest } from '../rooms.api';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type FormValues = z.infer<typeof joinRoomSchema>;

export default function JoinRoomForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(joinRoomSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setError(null);

      await joinRoomRequest(data.roomId);

      router.push(`/room/${data.roomId}`);
    } catch (err) {
      setError('Failed to join room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Room ID" {...form.register('roomId')} />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Joining...' : 'Join Room'}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
