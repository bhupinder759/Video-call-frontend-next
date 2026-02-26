'use client';

import { useEffect, useRef } from 'react';
import { useCallStore } from '@/store/call.store';

export default function LocalVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const stream = useCallStore((s) => s.localStream);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      /* Added object-cover to fill the container, and mirror effect (scale-x-[-1]) 
         so it feels like looking in a mirror, which is standard for local webcams */
      className="w-full h-full object-cover bg-zinc-950 rounded-2xl transform scale-x-[-1]"
    />
  );
}
