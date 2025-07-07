import { Request, Response } from 'express';
import { HabilidadeService } from '../../services/tabelas_base/habilidade.service';
import { CreateHabilidadeDto, UpdateHabilidadeDto, HabilidadeResponseDto } from '../../dtos/tabelas_base/habilidade.dto';
import { ApiError } from '../../utils/apiError';

export class HabilidadeController {
    private habilidadeService = new HabilidadeService();

    async createHabilidade(req: Request, res: Response) {
        try {
            const createHabilidadeDto: CreateHabilidadeDto = req.body;
            const newHabilidade = await this.habilidadeService.createHabilidade(createHabilidadeDto);
            res.status(201).json(newHabilidade);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllHabilidades(req: Request, res: Response) {
        try {
            const habilidades = await this.habilidadeService.getAllHabilidades();
            res.status(200).json(habilidades);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getHabilidadeById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const habilidade = await this.habilidadeService.getHabilidadeById(id);
            res.status(200).json(habilidade);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateHabilidade(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateHabilidadeDto: UpdateHabilidadeDto = req.body;
            const updatedHabilidade = await this.habilidadeService.updateHabilidade(id, updateHabilidadeDto);
            res.status(200).json(updatedHabilidade);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteHabilidade(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.habilidadeService.deleteHabilidade(id);
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