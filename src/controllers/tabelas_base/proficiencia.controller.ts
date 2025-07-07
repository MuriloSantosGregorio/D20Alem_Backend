import { Request, Response } from 'express';
import { ProficienciaService } from '../../services/tabelas_base/proficiencia.service';
import { CreateProficienciaDto, UpdateProficienciaDto, ProficienciaResponseDto } from '../../dtos/tabelas_base/proficiencia.dto';
import { ApiError } from '../../utils/apiError';

export class ProficienciaController {
    private proficienciaService = new ProficienciaService();

    async createProficiencia(req: Request, res: Response) {
        try {
            const createProficienciaDto: CreateProficienciaDto = req.body;
            const newProficiencia = await this.proficienciaService.createProficiencia(createProficienciaDto);
            res.status(201).json(newProficiencia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllProficiencia(req: Request, res: Response) {
        try {
            const proficiencias = await this.proficienciaService.getAllProficiencia();
            res.status(200).json(proficiencias);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getProficienciaById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const proficiencia = await this.proficienciaService.getProficienciaById(id);
            res.status(200).json(proficiencia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateProficiencia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateProficienciaDto: UpdateProficienciaDto = req.body;
            const updatedProficiencia = await this.proficienciaService.updateProficiencia(id, updateProficienciaDto);
            res.status(200).json(updatedProficiencia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteProficiencia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.proficienciaService.deleteProficiencia(id);
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