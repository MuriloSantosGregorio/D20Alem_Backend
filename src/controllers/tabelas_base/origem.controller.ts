import { Request, Response } from 'express';
import { OrigemService } from '../../services/tabelas_base/origem.service';
import { CreateOrigemDto, UpdateOrigemDto, OrigemResponseDto } from '../../dtos/tabelas_base/origem.dto';
import { ApiError } from '../../utils/apiError';

export class OrigemController {
  private origemService = new OrigemService();

  async createOrigem(req: Request, res: Response) {
    try {
      const createOrigemDto: CreateOrigemDto = req.body;
      const newOrigem = await this.origemService.createOrigem(createOrigemDto);
      res.status(201).json(newOrigem);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllOrigens(req: Request, res: Response) {
    try {
      const origens = await this.origemService.getAllOrigens();
      res.status(200).json(origens);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getOrigemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const origem = await this.origemService.getOrigemById(id);
      res.status(200).json(origem);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateOrigem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateOrigemDto: UpdateOrigemDto = req.body;
      const updatedOrigem = await this.origemService.updateOrigem(id, updateOrigemDto);
      res.status(200).json(updatedOrigem);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteOrigem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.origemService.deleteOrigem(id);
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