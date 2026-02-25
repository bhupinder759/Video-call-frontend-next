// import { create } from 'zustand';
// import { io, Socket } from 'socket.io-client';

// interface AuthState {
//   accessToken: string | null;
//   socket: Socket | null;

//   isLoading: boolean;
//   setLoading: (value: boolean) => void;
//   setAccessToken: (token: string | null) => void;
//   connectSocket: () => void;
//   disconnectSocket: () => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set, get) => ({
//   accessToken: null,
//   socket: null,
//   isLoading: false,
//   setLoading: (value) => set({ isLoading: value }),

//   setAccessToken: (token) => {
//     set({ accessToken: token });

//     // if (token) {
//     //   get().connectSocket();
//     // }
//   },

//   connectSocket: () => {
//     const { accessToken } = get();
//     if (!accessToken) return;

//     const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
//       auth: { token: accessToken },
//     });

//     set({ socket });
//   },

//   disconnectSocket: () => {
//     const { socket } = get();
//     if (socket) {
//       socket.disconnect();
//       set({ socket: null });
//     }
//   },

//   logout: () => {
//     const { disconnectSocket } = get();
//     disconnectSocket();
//     set({ accessToken: null });
//   },
// }));

import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  isLoading: boolean;

  setLoading: (value: boolean) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isLoading: false,

  setLoading: (value) => set({ isLoading: value }),

  setAccessToken: (token) => set({ accessToken: token }),

  logout: () => set({ accessToken: null }),
}));
