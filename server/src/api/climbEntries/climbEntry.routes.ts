import {  Router } from 'express';
import * as ClimbEntryHandlers from './climbEntry.handlers';
import { ClimbEntry } from './climbEntry.model';

import { validateRequest } from '../../middlewares'; 
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/', ClimbEntryHandlers.findAllClimbEntries);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ClimbEntryHandlers.findOneClimbEntry,
);  

router.post(
  '/',
  validateRequest({
    body: ClimbEntry,
  }),
  ClimbEntryHandlers.CreateClimbEntry);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: ClimbEntry,
  }),
  ClimbEntryHandlers.UpdateClimbEntry);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ClimbEntryHandlers.DeleteClimbEntry);

export default router;