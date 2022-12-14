import {  Router } from 'express';
import * as UsersHandlers from './users.handlers';
import { User } from './users.model';

import { validateRequest } from '../../middlewares'; 
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();

router.get('/', UsersHandlers.findAllUsers);

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsersHandlers.findOneUser);

router.post(
  '/',
  validateRequest({
    body: User,
  }),
  UsersHandlers.CreateUser);

router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: User,
  }),
  UsersHandlers.UpdateUser);

router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  UsersHandlers.DeleteUser);

export default router;