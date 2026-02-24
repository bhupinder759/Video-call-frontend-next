'use client';

import { useEffect } from 'react';
import { refreshRequest } from '@/modules/auth/auth.api';
import { useAuthStore } from '@/store/auth.store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refreshRequest();
        setAccessToken(data.accessToken);
      } catch {
        // not logged in
      }
    };

    initAuth();
  }, [setAccessToken]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
