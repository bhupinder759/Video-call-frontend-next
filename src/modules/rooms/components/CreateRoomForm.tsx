'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoomSchema } from '../rooms.schema';
import { createRoomRequest } from '../rooms.api';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type FormValues = z.infer<typeof createRoomSchema>;

export default function CreateRoomForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(createRoomSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setError(null);

      const room = await createRoomRequest(data.name);

      router.push(`/room/${room.id}`);
    } catch (err) {
      setError('Failed to create room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Room name" {...form.register('name')} />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating...' : 'Create Room'}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
