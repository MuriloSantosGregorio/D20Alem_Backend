import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';

// Interface estendida para o objeto Request do Express
declare module 'express' {
  interface Request {
    user?: {
      usuarioid: string;
      usuarioemail: string;
    };
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  // Verifica se o header Authorization existe e está no formato correto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Token de autenticação não fornecido ou formato inválido'));
  }

  // Extrai o token do header
  const token = authHeader.split(' ')[1];
  
  try {
    // Verifica e decodifica o token
    const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
    const decoded = jwt.verify(token, jwtSecret) as { 
      userId: string;
      email: string;
    };
    
    // Adiciona as informações do usuário ao objeto Request
    req.user = {
      usuarioid: decoded.userId,
      usuarioemail: decoded.email
    };

    // Continua para a próxima middleware/controller
    next();
  } catch (error) {
    // Tratamento específico para diferentes tipos de erros do JWT
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, 'Token expirado'));
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, 'Token inválido'));
    }
    
    // Erro genérico
    return next(new ApiError(500, 'Erro na autenticação'));
  }
};