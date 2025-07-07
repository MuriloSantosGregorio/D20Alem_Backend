import { Request, Response } from 'express';
import { ClasseService } from '../../services/tabelas_base/classe.service';
import { CreateClasseDto, UpdateClasseDto, ClasseResponseDto } from '../../dtos/tabelas_base/classe.dto';
import { ApiError } from '../../utils/apiError';

export class ClasseController {
    private classeService = new ClasseService();

    async createClasse(req: Request, res: Response) {
        try {
            const createClasseDto: CreateClasseDto = req.body;
            const newClasse = await this.classeService.createClasse(createClasseDto);
            res.status(201).json(newClasse);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getAllClasses(req: Request, res: Response) {
        try {
            const classes = await this.classeService.getAllClasses();
            res.status(200).json(classes);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async getClasseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const classe = await this.classeService.getClasseById(id);
            res.status(200).json(classe);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async updateClasse(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateClasseDto: UpdateClasseDto = req.body;
            const updatedClasse = await this.classeService.updateClasse(id, updateClasseDto);
            res.status(200).json(updatedClasse);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deleteClasse(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.classeService.deleteClasse(id);
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