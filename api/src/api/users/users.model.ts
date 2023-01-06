import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const User = z.object({
  firstName: z.string().min(1),
  password: z.string().min(5),
  climbEntry_id: z.string().array().optional(),
  sessionEntry_id: z.string().array().optional(),
  ticklist_id: z.string().array().optional(),
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('User');