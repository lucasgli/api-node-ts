import type { Request, Response, NextFunction } from 'express';
import type { AnyZodObject } from 'zod';
import { AppError } from '../../utils/AppErrors';


type ValidateTargets = {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
};

export function validate({ body, params, query }: ValidateTargets) {
  return (req: Request, _: Response, next: NextFunction) => {
    const errors: Record<string, unknown> = {};

    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) errors.body = parsed.error.flatten();
      else req.body = parsed.data;
    }

    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) errors.params = parsed.error.flatten();
      else req.params = parsed.data as any;
    }

    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) errors.query = parsed.error.flatten();
      else req.query = parsed.data as any;
    }

    if (Object.keys(errors).length) {
      throw new AppError(
        `Validation error: ${JSON.stringify(errors)}`,
        400
      );
    }

    return next();
  };
}
