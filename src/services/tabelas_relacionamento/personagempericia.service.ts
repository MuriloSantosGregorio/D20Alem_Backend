import { AppDataSource } from '../../config/database';
import { Personagempericiat20 } from '../../entities/Personagempericiat20';
import { Periciast20 } from '../../entities/Periciast20';
import { Personagenst20 } from '../../entities/Personagenst20';
import { CreatePersonagemPericiaDto, UpdatePersonagemPericiaDto, PersonagemPericiaResponseDto } from '../../dtos/tabelas_relacionamento/personagempericia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class PersonagemPericiaService {
  private personagemPericiaRepository: Repository<Personagempericiat20>;
  private periciaRepository: Repository<Periciast20>;
  private personagemRepository: Repository<Personagenst20>;

  constructor() {
    this.personagemPericiaRepository = AppDataSource.getRepository(Personagempericiat20);
    this.periciaRepository = AppDataSource.getRepository(Periciast20);
    this.personagemRepository = AppDataSource.getRepository(Personagenst20);
  }

  async createPersonagemPericia(createDto: CreatePersonagemPericiaDto): Promise<PersonagemPericiaResponseDto> {
    const { periciaid, personagemid, bonusadicional } = createDto;

    // Verify related entities
    const pericia = await this.periciaRepository.findOne({ where: { periciaid } });
    if (!pericia) throw new ApiError(404, 'Perícia não encontrada');

    const personagem = await this.personagemRepository.findOne({ where: { personagemid } });
    if (!personagem) throw new ApiError(404, 'Personagem não encontrado');

    // Check for existing personagem-pericia combination
    const existing = await this.personagemPericiaRepository.findOne({
      where: { pericia: { periciaid }, personagem: { personagemid } },
    });
    if (existing) throw new ApiError(400, 'Esta perícia já está associada a este personagem');

    const newPersonagemPericia = this.personagemPericiaRepository.create({
      bonusadicional,
      pericia,
      personagem,
    });

    const saved = await this.personagemPericiaRepository.save(newPersonagemPericia);
    return this.mapToDto(saved);
  }

  async getAllPersonagemPericias(): Promise<PersonagemPericiaResponseDto[]> {
    const personagemPericias = await this.personagemPericiaRepository.find({
      relations: ['pericia', 'personagem'],
    });
    return personagemPericias.map(this.mapToDto);
  }

  async getPersonagemPericiaById(id: string): Promise<PersonagemPericiaResponseDto> {
    const personagemPericia = await this.personagemPericiaRepository.findOne({
      where: { personagempericiaid: id },
      relations: ['pericia', 'personagem'],
    });
    if (!personagemPericia) throw new ApiError(404, 'Personagem-perícia não encontrada');
    return this.mapToDto(personagemPericia);
  }

  async updatePersonagemPericia(id: string, updateDto: UpdatePersonagemPericiaDto): Promise<PersonagemPericiaResponseDto> {
    const personagemPericia = await this.personagemPericiaRepository.findOne({
      where: { personagempericiaid: id },
      relations: ['pericia', 'personagem'],
    });
    if (!personagemPericia) throw new ApiError(404, 'Personagem-perícia não encontrada');

    // Update related entities if provided
    if (updateDto.periciaid) {
      const pericia = await this.periciaRepository.findOne({ where: { periciaid: updateDto.periciaid } });
      if (!pericia) throw new ApiError(404, 'Perícia não encontrada');
      personagemPericia.pericia = pericia;
    }

    if (updateDto.personagemid) {
      const personagem = await this.personagemRepository.findOne({ where: { personagemid: updateDto.personagemid } });
      if (!personagem) throw new ApiError(404, 'Personagem não encontrado');
      personagemPericia.personagem = personagem;
    }

    // Check for duplicate combination if changing pericia or personagem
    if (updateDto.periciaid || updateDto.personagemid) {
      const existing = await this.personagemPericiaRepository.findOne({
        where: {
          pericia: { periciaid: updateDto.periciaid || personagemPericia.pericia.periciaid },
          personagem: { personagemid: updateDto.personagemid || personagemPericia.personagem.personagemid },
        },
      });
      if (existing && existing.personagempericiaid !== id) {
        throw new ApiError(400, 'Esta perícia já está associada a este personagem');
      }
    }

    // Update simple fields
    if (updateDto.bonusadicional !== undefined) {
      personagemPericia.bonusadicional = updateDto.bonusadicional;
    }

    const updated = await this.personagemPericiaRepository.save(personagemPericia);
    return this.mapToDto(updated);
  }

  async deletePersonagemPericia(id: string): Promise<void> {
    const result = await this.personagemPericiaRepository.delete(id);
    if (result.affected === 0) throw new ApiError(404, 'Personagem-perícia não encontrada');
  }

  private mapToDto(personagemPericia: Personagempericiat20): PersonagemPericiaResponseDto {
    return {
      personagempericiaid: personagemPericia.personagempericiaid,
      bonusadicional: personagemPericia.bonusadicional,
      periciaid: personagemPericia.pericia.periciaid,
      personagemid: personagemPericia.personagem.personagemid,
    };
  }
}