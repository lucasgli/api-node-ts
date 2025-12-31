import { Router } from 'express';
import { healthController } from '../controllers/health.controller';


export const routes = Router();

routes.get('/health', healthController.handle);