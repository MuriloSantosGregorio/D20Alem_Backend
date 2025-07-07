import { Request, Response } from 'express';
import { PersonagemPericiaService } from '../../services/tabelas_relacionamento/personagempericia.service';
import { CreatePersonagemPericiaDto, UpdatePersonagemPericiaDto, PersonagemPericiaResponseDto } from '../../dtos/tabelas_relacionamento/personagempericia.dto';
import { ApiError } from '../../utils/apiError';

export class PersonagemPericiaController {
  private personagemPericiaService = new PersonagemPericiaService();

  async createPersonagemPericia(req: Request, res: Response) {
    try {
      const createDto: CreatePersonagemPericiaDto = req.body;
      const newPersonagemPericia = await this.personagemPericiaService.createPersonagemPericia(createDto);
      res.status(201).json(newPersonagemPericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllPersonagemPericias(req: Request, res: Response) {
    try {
      const personagemPericias = await this.personagemPericiaService.getAllPersonagemPericias();
      res.status(200).json(personagemPericias);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getPersonagemPericiaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const personagemPericia = await this.personagemPericiaService.getPersonagemPericiaById(id);
      res.status(200).json(personagemPericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updatePersonagemPericia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateDto: UpdatePersonagemPericiaDto = req.body;
      const updatedPersonagemPericia = await this.personagemPericiaService.updatePersonagemPericia(id, updateDto);
      res.status(200).json(updatedPersonagemPericia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deletePersonagemPericia(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.personagemPericiaService.deletePersonagemPericia(id);
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