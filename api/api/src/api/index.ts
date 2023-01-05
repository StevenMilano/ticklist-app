import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import ClimbEntry from './climbEntries/climbEntry.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/climb-entry', ClimbEntry);

export default router;
