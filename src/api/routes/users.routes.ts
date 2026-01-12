import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../middlewares/asyncHandler";
import { userController } from "../controllers/user.controller";
import {
  userCreateSchema,
  userIdParamSchema,
  userUpdateSchema,
} from "../../schemas/user.schema";
import { ensureAuth } from "../middlewares/ensureAuth.middleware";

export const userRoutes = Router();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateBody'
 *     responses:
 *       200:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       409:
 *         description: Email já em uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

userRoutes.post(
  "/",
  validate({ body: userCreateSchema }),
  asyncHandler((req, res) => userController.create(req, res))
);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRoutes.get(
  "/",
  asyncHandler((req, res) => userController.list(req, res))
);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Busca usuário por id (protegida)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

userRoutes.get(
  "/:id",
  ensureAuth, // add auth
  validate({ params: userIdParamSchema }),
  asyncHandler((req, res) => userController.getById(req, res))
);

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Atualiza usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateBody'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */

userRoutes.patch(
  "/:id",
  validate({ params: userIdParamSchema, body: userUpdateSchema }),
  asyncHandler((req, res) => userController.update(req, res))
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remove usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido
 */

userRoutes.delete(
  "/:id",
  validate({ params: userIdParamSchema }),
  asyncHandler((req, res) => userController.remove(req, res))
);
