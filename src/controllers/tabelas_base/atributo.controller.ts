import { Request, Response } from 'express';
import { AtributoService } from '../../services/tabelas_base/atributo.service';
import { CreateAtributoDto, UpdateAtributoDto, AtributoResponseDto } from '../../dtos/tabelas_base/atributo.dto';
import { ApiError } from '../../utils/apiError';

export class AtributoController {
    private atributoService = new AtributoService();

    async createAtributo(req: Request, res: Response) {
        try {
            const createAtributoDto: CreateAtributoDto = req.body;
            const newAtributo = await this.atributoService.createAtributo(createAtributoDto);
            res.status(201).json(newAtributo);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllAtributos(req: Request, res: Response) {
        try {
            const atributos = await this.atributoService.getAllAtributos();
            res.status(200).json(atributos);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAtributoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const atributo = await this.atributoService.getAtributoById(id);
            res.status(200).json(atributo);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateAtributo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateAtributoDto: UpdateAtributoDto = req.body;
            const updatedAtributo = await this.atributoService.updateAtributo(id, updateAtributoDto);
            res.status(200).json(updatedAtributo);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteAtributo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.atributoService.deleteAtributo(id);
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