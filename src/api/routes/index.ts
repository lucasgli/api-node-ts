import { Router } from "express";
import { healthController } from "../controllers/health.controller";
import { userRoutes } from "./users.routes";
import { authRoutes } from "./auth.routes";

export const routes = Router();

// Health
routes.get("/health", healthController.handle);

// Auth
routes.use(authRoutes);

// Users
routes.use("/users", userRoutes);
