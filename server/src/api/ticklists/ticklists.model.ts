import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const Ticklist = z.object({
  isCompleted: z.boolean().default(false),
  climbEntry_id: z.string().array().nonempty({
    message: 'A session must have at least 1 climb entry',
  }),
});

export type Ticklist = z.infer<typeof Ticklist>;
export type TicklistWithId = WithId<Ticklist>;
export const Ticklists = db.collection<Ticklist>('ticklist');