import { z } from 'zod';

export const userCreateSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  email: z.string().email('invalid email'),
  password: z.string().min(6, 'password must be at least 6 characters'),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().min(1, 'id is required'),
});
