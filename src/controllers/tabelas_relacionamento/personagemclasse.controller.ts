import { Request, Response } from 'express';
import { PersonagemClasseService } from '../../services/tabelas_relacionamento/personagemclasse.service';
import { CreatePersonagemClasseDto, UpdatePersonagemClasseDto, PersonagemClasseResponseDto } from '../../dtos/tabelas_relacionamento/personagemclasse.dto';
import { ApiError } from '../../utils/apiError';

export class PersonagemClasseController {
  private personagemClasseService = new PersonagemClasseService();

  async createPersonagemClasse(req: Request, res: Response) {
    try {
      const createDto: CreatePersonagemClasseDto = req.body;
      const newPersonagemClasse = await this.personagemClasseService.createPersonagemClasse(createDto);
      res.status(201).json(newPersonagemClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllPersonagemClasses(req: Request, res: Response) {
    try {
      const personagemClasses = await this.personagemClasseService.getAllPersonagemClasses();
      res.status(200).json(personagemClasses);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getPersonagemClasseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const personagemClasse = await this.personagemClasseService.getPersonagemClasseById(id);
      res.status(200).json(personagemClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updatePersonagemClasse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateDto: UpdatePersonagemClasseDto = req.body;
      const updatedPersonagemClasse = await this.personagemClasseService.updatePersonagemClasse(id, updateDto);
      res.status(200).json(updatedPersonagemClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deletePersonagemClasse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.personagemClasseService.deletePersonagemClasse(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async levelUp(req: Request, res: Response) {
    try {
      const { personagemid, classeid } = req.body;

      if (!personagemid || !classeid) {
        throw new ApiError(400, 'PersonagemID e ClasseID são obrigatórios');
      }

      const result = await this.personagemClasseService.levelUp(personagemid, classeid);
      res.status(result.isNew ? 201 : 200).json(result.personagemClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async firstLevel(req: Request, res: Response) {
    try {
      const { personagemid, classeid } = req.body;

      if (!personagemid || !classeid) {
        throw new ApiError(400, 'PersonagemID e ClasseID são obrigatórios');
      }

      const createDto: CreatePersonagemClasseDto = {
        personagemclasse: 1,
        classeid,
        personagemid,
      };

      const newPersonagemClasse = await this.personagemClasseService.createPersonagemClasse(createDto);
      res.status(201).json(newPersonagemClasse);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }
}