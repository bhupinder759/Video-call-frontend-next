import { create } from 'zustand';

interface CallState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  callStatus: 'idle' | 'connecting' | 'connected' | 'failed';
  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;
  setCallStatus: (status: CallState['callStatus']) => void;
}

export const useCallStore = create<CallState>((set) => ({
  localStream: null,
  remoteStream: null,
  callStatus: 'idle',
  setLocalStream: (stream) => set({ localStream: stream }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setCallStatus: (status) => set({ callStatus: status }),
}));
