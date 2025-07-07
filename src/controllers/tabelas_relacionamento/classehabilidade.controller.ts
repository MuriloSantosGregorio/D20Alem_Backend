import { Request, Response } from 'express';
import { ClasseHabilidadeService } from '../../services/tabelas_relacionamento/classehabilidade.service';
import { CreateClasseHabilidadeDto, UpdateClasseHabilidadeDto, ClasseHabilidadeResponseDto } from '../../dtos/tabelas_relacionamento/classehabilidade.dto';
import { ApiError } from '../../utils/apiError';

export class ClasseHabilidadeController {
  private classeHabilidadeService = new ClasseHabilidadeService();

  async createClasseHabilidade(req: Request, res: Response) {
    try {
      const createClasseHabilidadeDto: CreateClasseHabilidadeDto = req.body;
      const newClasseHabilidade = await this.classeHabilidadeService.createClasseHabilidade(createClasseHabilidadeDto);
      res.status(201).json(newClasseHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllClasseHabilidades(req: Request, res: Response) {
    try {
      const classeHabilidades = await this.classeHabilidadeService.getAllClasseHabilidades();
      res.status(200).json(classeHabilidades);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getClasseHabilidadeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const classeHabilidade = await this.classeHabilidadeService.getClasseHabilidadeById(id);
      res.status(200).json(classeHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateClasseHabilidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateClasseHabilidadeDto: UpdateClasseHabilidadeDto = req.body;
      const updatedClasseHabilidade = await this.classeHabilidadeService.updateClasseHabilidade(id, updateClasseHabilidadeDto);
      res.status(200).json(updatedClasseHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteClasseHabilidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.classeHabilidadeService.deleteClasseHabilidade(id);
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