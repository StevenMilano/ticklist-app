import {  Router } from 'express';
import * as SessionHandlers from './sessions.handlers';
import { Session } from './sessions.model';

import { validateRequest } from '../../middlewares'; 
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/', SessionHandlers.findAllSessions);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  SessionHandlers.findOneSession);

router.post(
  '/',
  validateRequest({
    body: Session,
  }),
  SessionHandlers.CreateSession);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Session,
  }),
  SessionHandlers.UpdateSession);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  SessionHandlers.DeleteSession);

export default router;