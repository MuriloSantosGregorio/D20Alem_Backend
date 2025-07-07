import { Request, Response } from 'express';
import { MagiaService } from '../../services/tabelas_base/magia.service';
import { CreateMagiaDto, UpdateMagiaDto, MagiaResponseDto } from '../../dtos/tabelas_base/magia.dto';
import { ApiError } from '../../utils/apiError';

export class MagiaController {
    private magiaService = new MagiaService();

    async createMagia(req: Request, res: Response) {
        try {
            const createMagiaDto: CreateMagiaDto = req.body;
            const newMagia = await this.magiaService.createMagia(createMagiaDto);
            res.status(201).json(newMagia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllMagia(req: Request, res: Response) {
        try {
            const magias = await this.magiaService.getAllMagia();
            res.status(200).json(magias);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getMagiaById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const magia = await this.magiaService.getMagiaById(id);
            res.status(200).json(magia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateMagia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateMagiaDto: UpdateMagiaDto = req.body;
            const updatedMagia = await this.magiaService.updateMagia(id, updateMagiaDto);
            res.status(200).json(updatedMagia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteMagia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.magiaService.deleteMagia(id);
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