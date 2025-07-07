import { Request, Response } from 'express';
import { ClasseProficienciaService } from '../../services/tabelas_relacionamento/classeproficiencia.service';
import { CreateClasseProficienciaDto, UpdateClasseProficienciaDto, ClasseProficienciaResponseDto } from '../../dtos/tabelas_relacionamento/classeproficiencia.dto';
import { ApiError } from '../../utils/apiError';

export class ClasseProficienciaController {
  private classeProficienciaService = new ClasseProficienciaService();

  async createClasseProficiencia(req: Request, res: Response) {
    try {
      const createClasseProficienciaDto: CreateClasseProficienciaDto = req.body;
      const newClasseProficiencia = await this.classeProficienciaService.createClasseProficiencia(createClasseProficienciaDto);
      res.status(201).json(newClasseProficiencia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllClasseProficiencias(req: Request, res: Response) {
    try {
      const classeProficiencias = await this.classeProficienciaService.getAllClasseProficiencias();
      res.status(200).json(classeProficiencias);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getClasseProficienciaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const classeProficiencia = await this.classeProficienciaService.getClasseProficienciaById(id);
      res.status(200).json(classeProficiencia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateClasseProficiencia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateClasseProficienciaDto: UpdateClasseProficienciaDto = req.body;
      const updatedClasseProficiencia = await this.classeProficienciaService.updateClasseProficiencia(id, updateClasseProficienciaDto);
      res.status(200).json(updatedClasseProficiencia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteClasseProficiencia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.classeProficienciaService.deleteClasseProficiencia(id);
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