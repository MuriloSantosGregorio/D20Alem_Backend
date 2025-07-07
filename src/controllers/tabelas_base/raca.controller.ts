import { Request, Response } from 'express';
import { RacaService } from '../../services/tabelas_base/raca.service';
import { CreateRacaDto, UpdateRacaDto, RacaResponseDto } from '../../dtos/tabelas_base/raca.dto';
import { ApiError } from '../../utils/apiError';

export class RacaController {
  private racaService = new RacaService();

  async createRaca(req: Request, res: Response) {
    try {
      const createRacaDto: CreateRacaDto = req.body;
      const newRaca = await this.racaService.createRaca(createRacaDto);
      res.status(201).json(newRaca);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllRacas(req: Request, res: Response) {
    try {
      const racas = await this.racaService.getAllRacas();
      res.status(200).json(racas);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getRacaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const raca = await this.racaService.getRacaById(id);
      res.status(200).json(raca);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateRaca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateRacaDto: UpdateRacaDto = req.body;
      const updatedRaca = await this.racaService.updateRaca(id, updateRacaDto);
      res.status(200).json(updatedRaca);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteRaca(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.racaService.deleteRaca(id);
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