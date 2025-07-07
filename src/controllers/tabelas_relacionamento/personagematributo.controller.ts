import { Request, Response } from 'express';
import { PersonagemAtributoService } from '../../services/tabelas_relacionamento/personagematributo.service';
import { CreatePersonagemAtributoDto, UpdatePersonagemAtributoDto, PersonagemAtributoResponseDto } from '../../dtos/tabelas_relacionamento/personagematributo.dto';
import { ApiError } from '../../utils/apiError';

export class PersonagemAtributoController {
  private personagemAtributoService = new PersonagemAtributoService();

  async createPersonagemAtributo(req: Request, res: Response) {
    try {
      const createDto: CreatePersonagemAtributoDto = req.body;
      const newPersonagemAtributo = await this.personagemAtributoService.createPersonagemAtributo(createDto);
      res.status(201).json(newPersonagemAtributo);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllPersonagemAtributos(req: Request, res: Response) {
    try {
      const personagemAtributos = await this.personagemAtributoService.getAllPersonagemAtributos();
      res.status(200).json(personagemAtributos);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getPersonagemAtributoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const personagemAtributo = await this.personagemAtributoService.getPersonagemAtributoById(id);
      res.status(200).json(personagemAtributo);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updatePersonagemAtributo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateDto: UpdatePersonagemAtributoDto = req.body;
      const updatedPersonagemAtributo = await this.personagemAtributoService.updatePersonagemAtributo(id, updateDto);
      res.status(200).json(updatedPersonagemAtributo);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deletePersonagemAtributo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.personagemAtributoService.deletePersonagemAtributo(id);
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