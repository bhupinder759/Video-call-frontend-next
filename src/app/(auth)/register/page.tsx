'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/modules/auth/auth.schema';
import { registerRequest } from '@/modules/auth/auth.api';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

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
    <div className="flex items-center justify-center h-screen">
      <Card className="p-6 w-96 space-y-4">
        <h2 className="text-xl font-semibold text-center">Create Account</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...form.register('name')} />

          <Input placeholder="Email" {...form.register('email')} />

          <Input
            type="password"
            placeholder="Password"
            {...form.register('password')}
          />

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}
