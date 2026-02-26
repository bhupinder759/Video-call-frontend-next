'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoomSchema } from '../rooms.schema';
import { createRoomRequest } from '../rooms.api';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Plus } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Plus className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Create Room</h2>
          <p className="text-sm text-zinc-400">Start a new video session</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="e.g. Daily Standup"
            className="h-11 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
            {...form.register('name')}
          />
          {form.formState.errors.name && (
            <p className="text-sm font-medium text-red-500/90">
              {form.formState.errors.name.message as string}
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
          className="w-full h-11 text-base font-semibold text-white transition-all bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.5)]"
        >
          {loading ? 'Creating...' : 'Create Room'}
        </Button>
      </form>
    </div>
  );
}
