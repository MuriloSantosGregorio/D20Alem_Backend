import { Request, Response } from 'express';
import { PersonagemProficienciaService } from '../../services/tabelas_relacionamento/personagemproficiencia.service';
import { CreatePersonagemProficienciaDto, UpdatePersonagemProficienciaDto, PersonagemProficienciaResponseDto } from '../../dtos/tabelas_relacionamento/personagemproficiencia.dto';
import { ApiError } from '../../utils/apiError';

export class PersonagemProficienciaController {
  private personagemProficienciaService = new PersonagemProficienciaService();

  async createPersonagemProficiencia(req: Request, res: Response) {
    try {
      const createDto: CreatePersonagemProficienciaDto = req.body;
      const newPersonagemProficiencia = await this.personagemProficienciaService.createPersonagemProficiencia(createDto);
      res.status(201).json(newPersonagemProficiencia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllPersonagemProficiencias(req: Request, res: Response) {
    try {
      const personagemProficiencias = await this.personagemProficienciaService.getAllPersonagemProficiencias();
      res.status(200).json(personagemProficiencias);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getPersonagemProficienciaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const personagemProficiencia = await this.personagemProficienciaService.getPersonagemProficienciaById(id);
      res.status(200).json(personagemProficiencia);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
        }
    }

    async updatePersonagemProficiencia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateDto: UpdatePersonagemProficienciaDto = req.body;
            const updatedPersonagemProficiencia = await this.personagemProficienciaService.updatePersonagemProficiencia(id, updateDto);
            res.status(200).json(updatedPersonagemProficiencia);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno do servidor' });
            }
        }
    }

    async deletePersonagemProficiencia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.personagemProficienciaService.deletePersonagemProficiencia(id);
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