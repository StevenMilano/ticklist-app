import { WithId } from 'mongodb';
import * as z from 'zod';
// import bcrypt from 'bcrypt';


import { db } from '../../db';

// const saltRounds = 10;

export const User = z.object({
  firstName: z.string().min(1),
  userName: z.string().min(4).max(10),
  password: z.string().min(5),
  token: z.string().optional(),
  climbEntry_id: z.string().array().optional(),
  sessionEntry_id: z.string().array().optional(),
  ticklist_id: z.string().array().optional(),
});

export type User = z.infer<typeof User>;
export type UserWithId = WithId<User>;
export const Users = db.collection<User>('User');