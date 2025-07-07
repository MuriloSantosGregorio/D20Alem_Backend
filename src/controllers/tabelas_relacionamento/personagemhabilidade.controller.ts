import { Request, Response } from 'express';
import { PersonagemHabilidadeService } from '../../services/tabelas_relacionamento/personagemhabilidade.service';
import { CreatePersonagemHabilidadeDto, UpdatePersonagemHabilidadeDto, PersonagemHabilidadeResponseDto } from '../../dtos/tabelas_relacionamento/personagemhabilidade.dto';
import { ApiError } from '../../utils/apiError';

export class PersonagemHabilidadeController {
  private personagemHabilidadeService = new PersonagemHabilidadeService();

  async createPersonagemHabilidade(req: Request, res: Response) {
    try {
      const createDto: CreatePersonagemHabilidadeDto = req.body;
      const newPersonagemHabilidade = await this.personagemHabilidadeService.createPersonagemHabilidade(createDto);
      res.status(201).json(newPersonagemHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllPersonagemHabilidades(req: Request, res: Response) {
    try {
      const personagemHabilidades = await this.personagemHabilidadeService.getAllPersonagemHabilidades();
      res.status(200).json(personagemHabilidades);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getPersonagemHabilidadeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const personagemHabilidade = await this.personagemHabilidadeService.getPersonagemHabilidadeById(id);
      res.status(200).json(personagemHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updatePersonagemHabilidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateDto: UpdatePersonagemHabilidadeDto = req.body;
      const updatedPersonagemHabilidade = await this.personagemHabilidadeService.updatePersonagemHabilidade(id, updateDto);
      res.status(200).json(updatedPersonagemHabilidade);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deletePersonagemHabilidade(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.personagemHabilidadeService.deletePersonagemHabilidade(id);
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