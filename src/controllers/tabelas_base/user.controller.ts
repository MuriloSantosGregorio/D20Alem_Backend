import { Request, Response } from 'express';
import { UserService } from '../../services/tabelas_base/user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../dtos/tabelas_base/user.dto';
import { ApiError } from '../../utils/apiError';

export class UserController {
    private userService = new UserService();

    async createUser(req: Request, res: Response) {
        try {
            const createUserDto: CreateUserDto = req.body;
            const newUser = await this.userService.createUser(createUserDto);
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateUserDto: UpdateUserDto = req.body;
            const updatedUser = await this.userService.updateUser(id, updateUserDto);
            res.status(200).json(updatedUser);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }
}