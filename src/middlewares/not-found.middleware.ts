import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(new ApiError(404, 'Rota não encontrada'));
}