export interface ServerToClientEvents {
  'user-joined': (data: { userId: string }) => void;
  'user-left': (data: { userId: string }) => void;
  offer: (data: { offer: RTCSessionDescriptionInit; from: string }) => void;

  answer: (data: { answer: RTCSessionDescriptionInit; from: string }) => void;
  'ice-candidate': (data: {
    candidate: RTCIceCandidateInit;
    from: string;
  }) => void;
}

export interface ClientToServerEvents {
  'join-room': (data: { roomId: string }) => void;
  'leave-room': (data: { roomId: string }) => void;
  offer: (data: { roomId: string; offer: unknown }) => void;
  answer: (data: { roomId: string; answer: unknown }) => void;
  'ice-candidate': (data: { roomId: string; candidate: unknown }) => void;
}
