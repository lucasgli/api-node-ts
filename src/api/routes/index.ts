import { Router } from 'express';
import { healthController } from '../controllers/health.controller';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../middlewares/asyncHandler';
import { userController } from '../controllers/user.controller';
import {
  userCreateSchema,
  userIdParamSchema,
  userUpdateSchema,
} from '../../schemas/user.schema';

export const routes = Router();

routes.get('/health', healthController.handle);

// Users
routes.post(
  '/users',
  validate({ body: userCreateSchema }),
  asyncHandler((req, res) => userController.create(req, res))
);

routes.get('/users', asyncHandler((req, res) => userController.list(req, res)));

routes.get(
  '/users/:id',
  validate({ params: userIdParamSchema }),
  asyncHandler((req, res) => userController.getById(req, res))
);

routes.patch(
  '/users/:id',
  validate({ params: userIdParamSchema, body: userUpdateSchema }),
  asyncHandler((req, res) => userController.update(req, res))
);

routes.delete(
  '/users/:id',
  validate({ params: userIdParamSchema }),
  asyncHandler((req, res) => userController.remove(req, res))
);
