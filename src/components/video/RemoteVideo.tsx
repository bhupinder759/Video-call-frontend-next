'use client';

import { useEffect, useRef } from 'react';
import { useCallStore } from '@/store/call.store';

export default function RemoteVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 🔹 Fixed: Changed from localStream to remoteStream
  const stream = useCallStore((s) => s.remoteStream);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      // 🔹 Fixed: Removed 'muted' so you can hear the incoming audio
      className="w-full h-full object-cover bg-zinc-950 rounded-2xl"
    />
  );
}
