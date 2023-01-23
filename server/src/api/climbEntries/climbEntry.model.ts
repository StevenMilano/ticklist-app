import { WithId } from 'mongodb';
import * as z from 'zod';

import { db } from '../../db';

export const ClimbEntry = z.object({
  indoorOutdoor: z.enum(['Indoor', 'Outdoor']),
  discipline: z.enum(['Sport', 'Trad', 'Top Rope', 'Boulder']),
  name: z.optional(z.string().min(1)),
  color: z.optional(z.string().min(1)),
  climbStyle: z.optional(z.object({
    crimp: z.boolean().default(false),
    pinch:  z.boolean().default(false),
    sloper:  z.boolean().default(false),
    jug:  z.boolean().default(false),
    slab:  z.boolean().default(false),
    overhang:  z.boolean().default(false),
    vert:  z.boolean().default(false),
    compStyle:  z.boolean().default(false),
    dynamic:  z.boolean().default(false),
    static:  z.boolean().default(false),
    complex:  z.boolean().default(false),
    power:  z.boolean().default(false),
    endurance:  z.boolean().default(false),
    technical:  z.boolean().default(false),
    compression:  z.boolean().default(false),
    heady:  z.boolean().default(false),
    faceClimbing:  z.boolean().default(false),
    arete:  z.boolean().default(false),
    dihedral:  z.boolean().default(false),
    balance:  z.boolean().default(false),
    layback:  z.boolean().default(false),
    undercling:  z.boolean().default(false),
    directional:  z.boolean().default(false),
  })),
  vScale: z.optional(z.enum(['Vintro', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9',
    'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17'])),
  font: z.optional(z.enum(['4', '5', '5+',
    '6a', '6a+', '6b', '6b+', '6c', '6c+',
    '7a', '7a+', '7b', '7b+', '7c', '7c+',
    '8a', '8a+', '8b', '8b+', '8c', '8c+',
    '9a'])),
  yds: z.optional(z.enum(['5.0', '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9',
    '5.10a', '5.10b', '5.10c', '5.10d',
    '5.11a', '5.11b', '5.11c', '5.11d',
    '5.12a', '5.12b', '5.12c', '5.12d',
    '5.13a', '5.13b', '5.13c', '5.13d',
    '5.14a', '5.14b', '5.14c', '5.14d',
    '5.15a', '5.15b', '5.15c', '5.15d'])),
  french: z.optional(z.enum(['1', '2', '3', '4', '5a', '5b', '5c',
    '6a', '6b', '6b+', '6c', '6c+',
    '7a', '7a+', '7b', '7b+', '7c', '7c+',
    '8a', '8a+', '8b', '8b+', '8c', '8c+',
    '9a', '9a+', '9b', '9b+', '9c'])),
  attempts: z.number().min(1),
  send: z.boolean(),
  date: z.preprocess((date) => {
    if (typeof date == 'string' || date instanceof Date) return new Date(date);
  }, z.date()),
  description: z.optional(z.string()),
  rating: z.optional(z.number()
    .min(1)
    .max(5)
    .default(1)),
  image: z.optional(z.string()),
});

export type ClimbEntry = z.infer<typeof ClimbEntry>;
export type ClimbEntryWithId = WithId<ClimbEntry>;
export const ClimbEntries = db.collection<ClimbEntry>('climb-entry');
