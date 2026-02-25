// import { create } from 'zustand';

// interface SocketState {
//   isConnected: boolean;
//   currentRoomId: string | null;
//   setConnected: (value: boolean) => void;
//   setRoom: (roomId: string | null) => void;
// }

// export const useSocketStore = create<SocketState>((set) => ({
//   isConnected: false,
//   currentRoomId: null,
//   setConnected: (value) => set({ isConnected: value }),
//   setRoom: (roomId) => set({ currentRoomId: roomId }),
// }));

import { create } from 'zustand';

interface SocketState {
  connected: boolean;
  currentRoomId: string | null;

  setConnected: (value: boolean) => void;
  setCurrentRoomId: (roomId: string | null) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  connected: false,
  currentRoomId: null,

  setConnected: (value) => set({ connected: value }),
  setCurrentRoomId: (roomId) => set({ currentRoomId: roomId }),
}));
