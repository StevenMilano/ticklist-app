import {  Router } from 'express';
import * as UsersHandlers from './users.handlers';
import { User } from './users.model';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { auth } from '../../middlewares';

import { validateRequest } from '../../middlewares'; 

const router = Router();

router.get('/test', UsersHandlers.findAllUsers);

router.get(
  '/',
  validateRequest({
    body: User,
  }),
  UsersHandlers.login);

router.post(
  '/',
  auth,
  validateRequest({
    body: User,
  }),
  UsersHandlers.CreateUser);

router.put(
  '/:id',
  auth,
  validateRequest({
    params: ParamsWithId,
    body: User,
  }),
  UsersHandlers.UpdateUser);

router.delete(
  '/:id',
  auth,
  validateRequest({
    body: User,
  }),
  UsersHandlers.DeleteUser);

export default router;