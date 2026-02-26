'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { joinRoomSchema } from '../rooms.schema';
import { joinRoomRequest } from '../rooms.api';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Link2 } from 'lucide-react';

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
      setError('Failed to join room. Please check the ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <Link2 className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Join Room</h2>
          <p className="text-sm text-zinc-400">Enter an existing invite ID</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Paste Room ID here..."
            className="h-11 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-purple-500"
            {...form.register('roomId')}
          />
          {form.formState.errors.roomId && (
            <p className="text-sm font-medium text-red-500/90">
              {form.formState.errors.roomId.message as string}
            </p>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-sm font-medium text-red-400">{error}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 text-base font-semibold text-white transition-all bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600"
        >
          {loading ? 'Joining...' : 'Join Room'}
        </Button>
      </form>
    </div>
  );
}
