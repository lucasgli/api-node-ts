import { Router } from 'express';
import { healthController } from '../controllers/health.controller';
import { userRoutes } from './users.routes';

export const routes = Router();

// Health
routes.get('/health', healthController.handle);

// Users
routes.use('/users', userRoutes);
