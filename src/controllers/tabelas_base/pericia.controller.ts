import { Request, Response } from 'express';
import { PericiaService } from '../../services/tabelas_base/pericia.service';
import { CreatePericiaDto, UpdatePericiaDto, PericiaResponseDto } from '../../dtos/tabelas_base/pericia.dto';
import { ApiError } from '../../utils/apiError';

export class PericiaController {
    private periciaService = new PericiaService();

    async createPericia(req: Request, res: Response) {
        try {
            const createPericiaDto: CreatePericiaDto = req.body;
            const newPericia = await this.periciaService.createPericia(createPericiaDto);
            res.status(201).json(newPericia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllPericias(req: Request, res: Response) {
        try {
            const pericias = await this.periciaService.getAllPericias();
            res.status(200).json(pericias);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getPericiaById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const pericia = await this.periciaService.getPericiaById(id);
            res.status(200).json(pericia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updatePericia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatePericiaDto: UpdatePericiaDto = req.body;
            const updatedPericia = await this.periciaService.updatePericia(id, updatePericiaDto);
            res.status(200).json(updatedPericia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deletePericia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.periciaService.deletePericia(id);
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