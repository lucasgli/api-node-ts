import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/AppErrors';

export function errorMiddleware(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: 'Internal server error',
  });
}
