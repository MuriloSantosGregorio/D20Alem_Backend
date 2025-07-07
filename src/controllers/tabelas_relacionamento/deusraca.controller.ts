import { Request, Response } from 'express';
import { DeusRacaService } from '../../services/tabelas_relacionamento/deusraca.service';
import { CreateDeusRacaDto, UpdateDeusRacaDto, DeusRacaResponseDto } from '../../dtos/tabelas_relacionamento/deusraca.dto';
import { ApiError } from '../../utils/apiError';

export class DeusRacaController {
  private deusRacaService = new DeusRacaService();

  async createDeusRaca(req: Request, res: Response) {
    try {
      const createDeusRacaDto: CreateDeusRacaDto = req.body;
      const newDeusRaca = await this.deusRacaService.createDeusRaca(createDeusRacaDto);
      res.status(201).json(newDeusRaca);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllDeusRacas(req: Request, res: Response) {
    try {
      const deusRacas = await this.deusRacaService.getAllDeusRacas();
      res.status(200).json(deusRacas);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getDeusRacaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deusRaca = await this.deusRacaService.getDeusRacaById(id);
      res.status(200).json(deusRaca);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateDeusRaca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateDeusRacaDto: UpdateDeusRacaDto = req.body;
      const updatedDeusRaca = await this.deusRacaService.updateDeusRaca(id, updateDeusRacaDto);
      res.status(200).json(updatedDeusRaca);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteDeusRaca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.deusRacaService.deleteDeusRaca(id);
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