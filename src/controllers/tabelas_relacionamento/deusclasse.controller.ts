import { Request, Response } from 'express';
import { DeusClasseService } from '../../services/tabelas_relacionamento/deusclasse.service';
import { CreateDeusClasseDto, UpdateDeusClasseDto, DeusClasseResponseDto } from '../../dtos/tabelas_relacionamento/deusclasse.dto';
import { ApiError } from '../../utils/apiError';

export class DeusClasseController {
  private deusClasseService = new DeusClasseService();

  async createDeusClasse(req: Request, res: Response) {
    try {
      const createDeusClasseDto: CreateDeusClasseDto = req.body;
      const newDeusClasse = await this.deusClasseService.createDeusClasse(createDeusClasseDto);
      res.status(201).json(newDeusClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllDeusClasses(req: Request, res: Response) {
    try {
      const deusClasses = await this.deusClasseService.getAllDeusClasses();
      res.status(200).json(deusClasses);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getDeusClasseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deusClasse = await this.deusClasseService.getDeusClasseById(id);
      res.status(200).json(deusClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateDeusClasse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateDeusClasseDto: UpdateDeusClasseDto = req.body;
      const updatedDeusClasse = await this.deusClasseService.updateDeusClasse(id, updateDeusClasseDto);
      res.status(200).json(updatedDeusClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteDeusClasse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.deusClasseService.deleteDeusClasse(id);
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