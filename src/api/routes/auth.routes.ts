import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { authController } from '../controllers/auth.controller';


export const authRoutes = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login e retorno do JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       200:
 *         description: Token gerado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
authRoutes.post(
  '/login',
  asyncHandler((req, res) => authController.login(req, res))
);
