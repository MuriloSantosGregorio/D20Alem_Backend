import { AppDataSource } from '../../config/database';
import { Personagematributot20 } from '../../entities/Personagematributot20';
import { Atributot20 } from '../../entities/Atributost20';
import { Personagenst20 } from '../../entities/Personagenst20';
import { CreatePersonagemAtributoDto, UpdatePersonagemAtributoDto, PersonagemAtributoResponseDto } from '../../dtos/tabelas_relacionamento/personagematributo.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class PersonagemAtributoService {
  private personagemAtributoRepository: Repository<Personagematributot20>;
  private atributoRepository: Repository<Atributot20>;
  private personagemRepository: Repository<Personagenst20>;

  constructor() {
    this.personagemAtributoRepository = AppDataSource.getRepository(Personagematributot20);
    this.atributoRepository = AppDataSource.getRepository(Atributot20);
    this.personagemRepository = AppDataSource.getRepository(Personagenst20);
  }

  async createPersonagemAtributo(createDto: CreatePersonagemAtributoDto): Promise<PersonagemAtributoResponseDto> {
    const { atributoid, personagemid, personagematributovalor, modificadortemporario } = createDto;

    // Verify related entities
    const atributo = await this.atributoRepository.findOne({ where: { atributoid } });
    if (!atributo) throw new ApiError(404, 'Atributo não encontrado');

    const personagem = await this.personagemRepository.findOne({ where: { personagemid } });
    if (!personagem) throw new ApiError(404, 'Personagem não encontrado');

    // Check for existing personagem-atributo combination
    const existing = await this.personagemAtributoRepository.findOne({
      where: { atributo: { atributoid }, personagem: { personagemid } },
    });
    if (existing) throw new ApiError(400, 'Este atributo já está associado a este personagem');

    const newPersonagemAtributo = this.personagemAtributoRepository.create({
      personagematributovalor,
      modificadortemporario,
      atributo,
      personagem,
    });

    const saved = await this.personagemAtributoRepository.save(newPersonagemAtributo);
    return this.mapToDto(saved);
  }

  async getAllPersonagemAtributos(): Promise<PersonagemAtributoResponseDto[]> {
    const personagemAtributos = await this.personagemAtributoRepository.find({
      relations: ['atributo', 'personagem'],
    });
    return personagemAtributos.map(this.mapToDto);
  }

  async getPersonagemAtributoById(id: string): Promise<PersonagemAtributoResponseDto> {
    const personagemAtributo = await this.personagemAtributoRepository.findOne({
      where: { personagematributoid: id },
      relations: ['atributo', 'personagem'],
    });
    if (!personagemAtributo) throw new ApiError(404, 'Personagem-atributo não encontrado');
    return this.mapToDto(personagemAtributo);
  }

  async updatePersonagemAtributo(id: string, updateDto: UpdatePersonagemAtributoDto): Promise<PersonagemAtributoResponseDto> {
    const personagemAtributo = await this.personagemAtributoRepository.findOne({
      where: { personagematributoid: id },
      relations: ['atributo', 'personagem'],
    });
    if (!personagemAtributo) throw new ApiError(404, 'Personagem-atributo não encontrado');

    // Update related entities if provided
    if (updateDto.atributoid) {
      const atributo = await this.atributoRepository.findOne({ where: { atributoid: updateDto.atributoid } });
      if (!atributo) throw new ApiError(404, 'Atributo não encontrado');
      personagemAtributo.atributo = atributo;
    }

    if (updateDto.personagemid) {
      const personagem = await this.personagemRepository.findOne({ where: { personagemid: updateDto.personagemid } });
      if (!personagem) throw new ApiError(404, 'Personagem não encontrado');
      personagemAtributo.personagem = personagem;
    }

    // Check for duplicate combination if changing atributo or personagem
    if (updateDto.atributoid || updateDto.personagemid) {
      const existing = await this.personagemAtributoRepository.findOne({
        where: {
          atributo: { atributoid: updateDto.atributoid || personagemAtributo.atributo.atributoid },
          personagem: { personagemid: updateDto.personagemid || personagemAtributo.personagem.personagemid },
        },
      });
      if (existing && existing.personagematributoid !== id) {
        throw new ApiError(400, 'Este atributo já está associado a este personagem');
      }
    }

    // Update simple fields
    if (updateDto.personagematributovalor !== undefined) {
      personagemAtributo.personagematributovalor = updateDto.personagematributovalor;
    }
    if (updateDto.modificadortemporario !== undefined) {
      personagemAtributo.modificadortemporario = updateDto.modificadortemporario;
    }

    const updated = await this.personagemAtributoRepository.save(personagemAtributo);
    return this.mapToDto(updated);
  }

  async deletePersonagemAtributo(id: string): Promise<void> {
    const result = await this.personagemAtributoRepository.delete(id);
    if (result.affected === 0) throw new ApiError(404, 'Personagem-atributo não encontrado');
  }

  private mapToDto(personagemAtributo: Personagematributot20): PersonagemAtributoResponseDto {
    return {
      personagematributoid: personagemAtributo.personagematributoid,
      personagematributovalor: personagemAtributo.personagematributovalor,
      modificadortemporario: personagemAtributo.modificadortemporario,
      atributoid: personagemAtributo.atributo.atributoid,
      personagemid: personagemAtributo.personagem.personagemid,
    };
  }
}