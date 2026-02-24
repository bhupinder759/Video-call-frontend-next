import { z } from 'zod';

export const createRoomSchema = z.object({
  name: z.string().min(2),
});

export const joinRoomSchema = z.object({
  roomId: z.string().uuid(),
});
