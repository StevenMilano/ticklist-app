import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Session = z.object({
  date: z.preprocess((date) => {
    if (typeof date == 'string' || date instanceof Date) return new Date(date);
  }, z.date()),
  lat: z.number().min(0).max(90),
  lng: z.number().min(-180).max(180),
  sessionDescription: z.optional(z.string()),
  climbEntry_id: z.string().array().nonempty({
    message: 'A session must have at least 1 climb entry',
  }),
});

export type Session = z.infer<typeof Session>;
export type SessionWithId = WithId<Session>;
export const Sessions = db.collection<Session>('session');