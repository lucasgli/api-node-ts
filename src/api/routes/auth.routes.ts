import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { authController } from '../controllers/auth.controller';


export const authRoutes = Router();

authRoutes.post(
  '/login',
  asyncHandler((req, res) => authController.login(req, res))
);
