import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/AppErrors';
import { env } from '../../config/env';

type JwtPayload = {
  sub: string;
};

export function ensureAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;

    req.user = {
      id: decoded.sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
