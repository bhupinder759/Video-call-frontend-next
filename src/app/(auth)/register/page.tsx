'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/modules/auth/auth.schema';
import { registerRequest } from '@/modules/auth/auth.api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { Video } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerRequest(data);

      // After successful registration → go to login
      router.push('/login');
    } catch (error) {
      console.error('Registration failed');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-zinc-950 selection:bg-indigo-500/30 px-4">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <Card className="relative z-10 w-full max-w-md p-8 border-zinc-800/50 bg-zinc-900/60 backdrop-blur-xl shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-indigo-600 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-center text-zinc-400">
            Join ConnectHQ to start your video calls
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Input
              placeholder="Full Name"
              className="h-11 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-sm font-medium text-red-500/90">
                {form.formState.errors.name.message as string}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Input
              placeholder="name@example.com"
              className="h-11 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm font-medium text-red-500/90">
                {form.formState.errors.email.message as string}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Create a password"
              className="h-11 bg-zinc-950/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p className="text-sm font-medium text-red-500/90">
                {form.formState.errors.password.message as string}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold text-white transition-all bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-5px_rgba(79,70,229,0.6)]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-sm text-center text-zinc-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
