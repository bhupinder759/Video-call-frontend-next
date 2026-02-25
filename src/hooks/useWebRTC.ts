'use client';

import { useEffect, useRef } from 'react';
import { getSocket } from '@/services/sockets';
import { getTurnCredentials } from '@/modules/call/turn.api';
import { useCallStore } from '@/store/call.store';

export const useWebRTC = (roomId: string) => {
  const pcRef = useRef<RTCPeerConnection | null>(null);

  const makingOffer = useRef(false);
  const ignoreOffer = useRef(false);
  const isPolite = useRef(false);

  const setLocalStream = useCallStore((s) => s.setLocalStream);
  const setRemoteStream = useCallStore((s) => s.setRemoteStream);
  const setCallStatus = useCallStore((s) => s.setCallStatus);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const socket = getSocket();
      if (!socket) return;

      setCallStatus('connecting');

      const turnConfig = await getTurnCredentials();

      const pc = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
          {
            urls: turnConfig.urls,
            username: turnConfig.username,
            credential: turnConfig.credential,
          },
        ],
      });

      pcRef.current = pc;

      // -------------------------
      // MEDIA PERMISSION HANDLING
      // -------------------------
      let stream: MediaStream;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error(
          'MediaDevices API not available (likely insecure origin)',
        );
        setCallStatus('failed');
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } catch (error) {
        console.error('Media access denied', error);
        setCallStatus('failed');
        return;
      }

      if (!isMounted) return;

      setLocalStream(stream);

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // -------------------------
      // REMOTE TRACK
      // -------------------------
      pc.ontrack = (event) => {
        const [remoteStream] = event.streams;
        setRemoteStream(remoteStream);
      };

      // -------------------------
      // CONNECTION STATE MONITOR
      // -------------------------
      pc.onconnectionstatechange = async () => {
        const state = pc.connectionState;

        if (state === 'connected') {
          setCallStatus('connected');
        }

        if (state === 'failed') {
          setCallStatus('failed');
          await pc.restartIce();
        }

        if (state === 'disconnected') {
          setCallStatus('connecting');
        }
      };

      // -------------------------
      // ICE CANDIDATE
      // -------------------------
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', {
            roomId,
            candidate: event.candidate.toJSON(),
          });
        }
      };

      // -------------------------
      // PERFECT NEGOTIATION
      // -------------------------
      pc.onnegotiationneeded = async () => {
        try {
          makingOffer.current = true;

          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);

          socket.emit('offer', {
            roomId,
            offer,
          });
        } finally {
          makingOffer.current = false;
        }
      };

      socket.on('user-joined', ({ userId }) => {
        const myId = socket.id;

        if (!myId) return;

        isPolite.current = myId > userId;
      });

      socket.on('offer', async ({ offer }) => {
        const pc = pcRef.current;
        if (!pc) return;

        const offerCollision =
          makingOffer.current || pc.signalingState !== 'stable';

        ignoreOffer.current = !isPolite.current && offerCollision;

        if (ignoreOffer.current) return;

        await pc.setRemoteDescription(offer);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit('answer', {
          roomId,
          answer,
        });
      });

      socket.on('answer', async ({ answer }) => {
        const pc = pcRef.current;
        if (!pc) return;

        await pc.setRemoteDescription(answer);
      });

      socket.on('ice-candidate', async ({ candidate }) => {
        try {
          const pc = pcRef.current;
          if (!pc) return;

          await pc.addIceCandidate(candidate);
        } catch (error) {
          console.error('ICE error:', error);
        }
      });

      // -------------------------
      // RECONNECT RECOVERY
      // -------------------------
      socket.io.on('reconnect', async () => {
        const pc = pcRef.current;
        if (!pc) return;

        setCallStatus('connecting');

        const offer = await pc.createOffer({
          iceRestart: true,
        });

        await pc.setLocalDescription(offer);

        socket.emit('offer', {
          roomId,
          offer,
        });
      });
    };

    init();

    return () => {
      isMounted = false;

      const socket = getSocket();
      if (socket) {
        socket.off('offer');
        socket.off('answer');
        socket.off('ice-candidate');
        socket.off('user-joined');
      }

      pcRef.current?.close();
      pcRef.current = null;

      useCallStore.getState().setLocalStream(null);
      useCallStore.getState().setRemoteStream(null);
      useCallStore.getState().setCallStatus('idle');
    };
  }, [roomId, setLocalStream, setRemoteStream, setCallStatus]);
};
