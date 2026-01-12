import { Router } from "express";
import { healthController } from "../controllers/health.controller";
import { userRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";

export const routes = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API ok
 */

// Health
routes.get("/health", healthController.handle);

// Auth
routes.use(authRoutes);

// Users
routes.use("/users", userRoutes);
