import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import ClimbEntry from './climbEntries/climbEntry.routes';
import Session from './sessions/sessions.routes';
import Ticklist from './ticklists/ticklists.routes';
import Users from './users/users.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/climb-entry', ClimbEntry);
router.use('/sessions', Session);
router.use('/ticklist', Ticklist);
router.use('/users', Users);

export default router;
