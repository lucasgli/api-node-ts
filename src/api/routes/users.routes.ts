import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../middlewares/asyncHandler';
import { userController } from '../controllers/user.controller';
import { userCreateSchema, userIdParamSchema, userUpdateSchema } from '../../schemas/user.schema';


export const userRoutes = Router();

userRoutes.post(
  '/',
  validate({ body: userCreateSchema }),
  asyncHandler((req, res) => userController.create(req, res))
);

userRoutes.get(
  '/',
  asyncHandler((req, res) => userController.list(req, res))
);

userRoutes.get(
  '/:id',
  validate({ params: userIdParamSchema }),
  asyncHandler((req, res) => userController.getById(req, res))
);

userRoutes.patch(
  '/:id',
  validate({ params: userIdParamSchema, body: userUpdateSchema }),
  asyncHandler((req, res) => userController.update(req, res))
);

userRoutes.delete(
  '/:id',
  validate({ params: userIdParamSchema }),
  asyncHandler((req, res) => userController.remove(req, res))
);
