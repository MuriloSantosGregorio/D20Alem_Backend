import { Request, Response } from 'express';
import { RacaAtributoService } from '../../services/tabelas_relacionamento/racaatributo.service';
import { CreateRacaAtributoDto, UpdateRacaAtributoDto, RacaAtributoResponseDto } from '../../dtos/tabelas_relacionamento/racaatributo.dto';
import { ApiError } from '../../utils/apiError';

export class RacaAtributoController {
  private racaAtributoService = new RacaAtributoService();

  async createRacaAtributo(req: Request, res: Response) {
    try {
      const createRacaAtributoDto: CreateRacaAtributoDto = req.body;
      const newRacaAtributo = await this.racaAtributoService.createRacaAtributo(createRacaAtributoDto);
      res.status(201).json(newRacaAtributo);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllRacaAtributos(req: Request, res: Response) {
    try {
      const racaAtributos = await this.racaAtributoService.getAllRacaAtributos();
      res.status(200).json(racaAtributos);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getRacaAtributoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const racaAtributo = await this.racaAtributoService.getRacaAtributoById(id);
      res.status(200).json(racaAtributo);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updateRacaAtributo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateRacaAtributoDto: UpdateRacaAtributoDto = req.body;
      const updatedRacaAtributo = await this.racaAtributoService.updateRacaAtributo(id, updateRacaAtributoDto);
      res.status(200).json(updatedRacaAtributo);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deleteRacaAtributo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.racaAtributoService.deleteRacaAtributo(id);
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