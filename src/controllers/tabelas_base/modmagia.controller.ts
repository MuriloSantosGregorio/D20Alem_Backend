import { Request, Response } from 'express';
import { ModMagiaService } from '../../services/tabelas_base/modmagia.service';
import { CreateModMagiaDto, UpdateModMagiaDto, ModMagiaResponseDto } from '../../dtos/tabelas_base/modmagia.dto';
import { ApiError } from '../../utils/apiError';

export class ModMagiaController {
  private modMagiaService = new ModMagiaService();

  async createModMagia(req: Request, res: Response) {
    try {
      const createModMagiaDto: CreateModMagiaDto = req.body;
      const newModMagia = await this.modMagiaService.createModMagia(createModMagiaDto);
      res.status(201).json(newModMagia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor'});
      }
    }
  }

  async getAllModMagias(req: Request, res: Response) {
    try {
      const modMagias = await this.modMagiaService.getAllModMagias();
      res.status(200).json(modMagias);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor'});
      }
    }
  }

  async getModMagiaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const modMagia = await this.modMagiaService.getModMagiaById(id);
      res.status(200).json(modMagia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor'});
      }
    }
  }

  async updateModMagia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateModMagiaDto: UpdateModMagiaDto = req.body;
      const updatedModMagia = await this.modMagiaService.updateModMagia(id, updateModMagiaDto);
      res.status(200).json(updatedModMagia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor'});
      }
    }
  }

  async deleteModMagia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.modMagiaService.deleteModMagia(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor'});
      }
    }
  }
}