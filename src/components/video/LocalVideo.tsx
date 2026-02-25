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
      className="w-full h-64 bg-black rounded"
    />
  );
}
