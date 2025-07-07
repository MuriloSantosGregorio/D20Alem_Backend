import { Request, Response } from 'express';
import { PersonagemService } from '../../services/tabelas_base/personagem.service';
import { CreatePersonagemDto, UpdatePersonagemDto, PersonagemResponseDto } from '../../dtos/tabelas_base/personagem.dto';
import { ApiError } from '../../utils/apiError';

export class PersonagemController {
  private personagemService = new PersonagemService();

  async createPersonagem(req: Request, res: Response) {
    try {
      const createPersonagemDto: CreatePersonagemDto = req.body;
      
      // Pegar o ID do usuário do token JWT
      const usuarioid = req.user?.usuarioid;
      if (!usuarioid) {
        throw new ApiError(401, 'Usuário não autenticado');
      }

      // Criar objeto com os dados do personagem incluindo o usuarioid
      const personagemData = {
        ...createPersonagemDto,
        usuarioid
      };

      const newPersonagem = await this.personagemService.createPersonagem(personagemData);
      res.status(201).json(newPersonagem);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getAllPersonagens(req: Request, res: Response) {
    try {
      const personagens = await this.personagemService.getAllPersonagens();
      res.status(200).json(personagens);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async getPersonagemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const personagem = await this.personagemService.getPersonagemById(id);
      res.status(200).json(personagem);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async updatePersonagem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatePersonagemDto: UpdatePersonagemDto = req.body;
      const updatedPersonagem = await this.personagemService.updatePersonagem(id, updatePersonagemDto);
      res.status(200).json(updatedPersonagem);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
  }

  async deletePersonagem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.personagemService.deletePersonagem(id);
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