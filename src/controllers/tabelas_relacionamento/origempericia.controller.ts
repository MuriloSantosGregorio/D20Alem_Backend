import { Request, Response } from 'express';
import { OrigemPericiaService } from '../../services/tabelas_relacionamento/origempericia.service';
import { CreateOrigemPericiaDto, UpdateOrigemPericiaDto, OrigemPericiaResponseDto } from '../../dtos/tabelas_relacionamento/origempericia.dto';
import { ApiError } from '../../utils/apiError';

export class OrigemPericiaController {
  private origemPericiaService = new OrigemPericiaService();

  async createOrigemPericia(req: Request, res: Response) {
    try {
      const createOrigemPericiaDto: CreateOrigemPericiaDto = req.body;
      const newOrigemPericia = await this.origemPericiaService.createOrigemPericia(createOrigemPericiaDto);
      res.status(201).json(newOrigemPericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllOrigemPericias(req: Request, res: Response) {
    try {
      const origemPericias = await this.origemPericiaService.getAllOrigemPericias();
      res.status(200).json(origemPericias);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getOrigemPericiaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const origemPericia = await this.origemPericiaService.getOrigemPericiaById(id);
      res.status(200).json(origemPericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateOrigemPericia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateOrigemPericiaDto: UpdateOrigemPericiaDto = req.body;
      const updatedOrigemPericia = await this.origemPericiaService.updateOrigemPericia(id, updateOrigemPericiaDto);
      res.status(200).json(updatedOrigemPericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteOrigemPericia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.origemPericiaService.deleteOrigemPericia(id);
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