import { Request, Response } from 'express';
import { RacaHabilidadeService } from '../../services/tabelas_relacionamento/racahabilidade.service';
import { CreateRacaHabilidadeDto, UpdateRacaHabilidadeDto, RacaHabilidadeResponseDto } from '../../dtos/tabelas_relacionamento/racahabilidade.dto';
import { ApiError } from '../../utils/apiError';

export class RacaHabilidadeController {
  private racaHabilidadeService = new RacaHabilidadeService();

  async createRacaHabilidade(req: Request, res: Response) {
    try {
      const createRacaHabilidadeDto: CreateRacaHabilidadeDto = req.body;
      const newRacaHabilidade = await this.racaHabilidadeService.createRacaHabilidade(createRacaHabilidadeDto);
      res.status(201).json(newRacaHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllRacaHabilidades(req: Request, res: Response) {
    try {
      const racaHabilidades = await this.racaHabilidadeService.getAllRacaHabilidades();
      res.status(200).json(racaHabilidades);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getRacaHabilidadeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const racaHabilidade = await this.racaHabilidadeService.getRacaHabilidadeById(id);
      res.status(200).json(racaHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateRacaHabilidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateRacaHabilidadeDto: UpdateRacaHabilidadeDto = req.body;
      const updatedRacaHabilidade = await this.racaHabilidadeService.updateRacaHabilidade(id, updateRacaHabilidadeDto);
      res.status(200).json(updatedRacaHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteRacaHabilidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.racaHabilidadeService.deleteRacaHabilidade(id);
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