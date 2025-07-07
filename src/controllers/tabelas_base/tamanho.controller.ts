import { Request, Response } from 'express';
import { TamanhoService } from '../../services/tabelas_base/tamanho.service';
import { CreateTamanhoDto, UpdateTamanhoDto, TamanhoResponseDto } from '../../dtos/tabelas_base/tamanho.dto';
import { ApiError } from '../../utils/apiError';

export class TamanhoController {
    private tamanhoService = new TamanhoService();

    async createTamanho(req: Request, res: Response) {
        try {
            const createTamanhoDto: CreateTamanhoDto = req.body;
            const newTamanho = await this.tamanhoService.createTamanho(createTamanhoDto);
            res.status(201).json(newTamanho);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllTamanhos(req: Request, res: Response) {
        try {
            const tamanhos = await this.tamanhoService.getAllTamanhos();
            res.status(200).json(tamanhos);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getTamanhoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tamanho = await this.tamanhoService.getTamanhoById(id);
            res.status(200).json(tamanho);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateTamanho(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateTamanhoDto: UpdateTamanhoDto = req.body;
            const updatedTamanho = await this.tamanhoService.updateTamanho(id, updateTamanhoDto);
            res.status(200).json(updatedTamanho);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteTamanho(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.tamanhoService.deleteTamanho(id);
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