import {  Router } from 'express';
import * as TicklistHandlers from './ticklists.handlers';
import { Ticklist } from './ticklists.model';

import { validateRequest } from '../../middlewares'; 
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/', TicklistHandlers.findAllTicks);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TicklistHandlers.findOneTick);

router.post(
  '/',
  validateRequest({
    body: Ticklist,
  }),
  TicklistHandlers.CreateTick);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Ticklist,
  }),
  TicklistHandlers.UpdateTick);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TicklistHandlers.DeleteTick);

export default router;