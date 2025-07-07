import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { ApiError } from '../utils/apiError';

export class AuthController {
    private authService = new AuthService();

    async register(req: Request, res: Response) {
        try {
            const registerDto: RegisterDto = req.body;
            const newUser = await this.authService.register(registerDto);
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async login(req: Request, res: Response) {
        try {
            const loginDto: LoginDto = req.body;
            const result = await this.authService.login(loginDto);
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.status(200).json({ message: 'Logout realizado com sucesso' });
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new ApiError(401, 'Token não fornecido');
            }

            const user = await this.authService.validateToken(token);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }
}