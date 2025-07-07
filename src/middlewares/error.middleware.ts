import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('[error]', err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.statusCode
      }
    });
  }

  res.status(500).json({
    error: {
      message: 'Erro interno no servidor',
      code: 500
    }
  });
}