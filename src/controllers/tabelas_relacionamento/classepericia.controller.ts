import { Request, Response } from 'express';
import { ClassePericiaService } from '../../services/tabelas_relacionamento/classepericia.service';
import { CreateClassePericiaDto, UpdateClassePericiaDto, ClassePericiaResponseDto } from '../../dtos/tabelas_relacionamento/classepericia.dto';
import { ApiError } from '../../utils/apiError';

export class ClassePericiaController {
  private classePericiaService = new ClassePericiaService();

  async createClassePericia(req: Request, res: Response) {
    try {
      const createClassePericiaDto: CreateClassePericiaDto = req.body;
      const newClassePericia = await this.classePericiaService.createClassePericia(createClassePericiaDto);
      res.status(201).json(newClassePericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllClassePericias(req: Request, res: Response) {
    try {
      const classePericias = await this.classePericiaService.getAllClassePericias();
      res.status(200).json(classePericias);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getClassePericiaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const classePericia = await this.classePericiaService.getClassePericiaById(id);
      res.status(200).json(classePericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateClassePericia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateClassePericiaDto: UpdateClassePericiaDto = req.body;
      const updatedClassePericia = await this.classePericiaService.updateClassePericia(id, updateClassePericiaDto);
      res.status(200).json(updatedClassePericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteClassePericia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.classePericiaService.deleteClassePericia(id);
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