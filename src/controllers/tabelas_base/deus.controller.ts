import { Request, Response } from 'express';
import { DeusService } from '../../services/tabelas_base/deus.service';
import { CreateDeusDto, UpdateDeusDto, DeusResponseDto } from '../../dtos/tabelas_base/deus.dto';
import { ApiError } from '../../utils/apiError';

export class DeusController {
    private deusService = new DeusService();

    async createDeus(req: Request, res: Response) {
        try {
            const createDeusDto: CreateDeusDto = req.body;
            const newDeus = await this.deusService.createDeus(createDeusDto);
            res.status(201).json(newDeus);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllDeus(req: Request, res: Response) {
        try {
            const deuses = await this.deusService.getAllDeus();
            res.status(200).json(deuses);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getDeusById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deus = await this.deusService.getDeusById(id);
            res.status(200).json(deus);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateDeus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateDeusDto: UpdateDeusDto = req.body;
            const updatedDeus = await this.deusService.updateDeus(id, updateDeusDto);
            res.status(200).json(updatedDeus);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteDeus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.deusService.deleteDeus(id);
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