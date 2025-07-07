import { AppDataSource } from '../../config/database';
import { Personagemproficienciat20 } from '../../entities/Personagemproficienciat20';
import { Proficienciast20 } from '../../entities/Proficienciast20';
import { Personagenst20 } from '../../entities/Personagenst20';
import { CreatePersonagemProficienciaDto, UpdatePersonagemProficienciaDto, PersonagemProficienciaResponseDto } from '../../dtos/tabelas_relacionamento/personagemproficiencia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class PersonagemProficienciaService {
  private personagemProficienciaRepository: Repository<Personagemproficienciat20>;
  private proficienciaRepository: Repository<Proficienciast20>;
  private personagemRepository: Repository<Personagenst20>;

  constructor() {
    this.personagemProficienciaRepository = AppDataSource.getRepository(Personagemproficienciat20);
    this.proficienciaRepository = AppDataSource.getRepository(Proficienciast20);
    this.personagemRepository = AppDataSource.getRepository(Personagenst20);
  }

  async createPersonagemProficiencia(createDto: CreatePersonagemProficienciaDto): Promise<PersonagemProficienciaResponseDto> {
    const { proficienciaid, personagemid } = createDto;

    // Verify related entities
    const proficiencia = await this.proficienciaRepository.findOne({ where: { proficienciaid } });
    if (!proficiencia) throw new ApiError(404, 'Proficiência não encontrada');

    const personagem = await this.personagemRepository.findOne({ where: { personagemid } });
    if (!personagem) throw new ApiError(404, 'Personagem não encontrado');

    // Check for existing personagem-proficiencia combination
    const existing = await this.personagemProficienciaRepository.findOne({
      where: { proficiencia: { proficienciaid }, personagem: { personagemid } },
    });
    if (existing) throw new ApiError(400, 'Esta proficiência já está associada a este personagem');

    const newPersonagemProficiencia = this.personagemProficienciaRepository.create({
      proficiencia,
      personagem,
    });

    const saved = await this.personagemProficienciaRepository.save(newPersonagemProficiencia);
    return this.mapToDto(saved);
  }

  async getAllPersonagemProficiencias(): Promise<PersonagemProficienciaResponseDto[]> {
    const personagemProficiencias = await this.personagemProficienciaRepository.find({
      relations: ['proficiencia', 'personagem'],
    });
    return personagemProficiencias.map(this.mapToDto);
  }

  async getPersonagemProficienciaById(id: string): Promise<PersonagemProficienciaResponseDto> {
    const personagemProficiencia = await this.personagemProficienciaRepository.findOne({
      where: { personagemproficienciaid: id },
      relations: ['proficiencia', 'personagem'],
    });
    if (!personagemProficiencia) throw new ApiError(404, 'Personagem-proficiência não encontrada');
    return this.mapToDto(personagemProficiencia);
  }

  async updatePersonagemProficiencia(id: string, updateDto: UpdatePersonagemProficienciaDto): Promise<PersonagemProficienciaResponseDto> {
    const personagemProficiencia = await this.personagemProficienciaRepository.findOne({
      where: { personagemproficienciaid: id },
      relations: ['proficiencia', 'personagem'],
    });
    if (!personagemProficiencia) throw new ApiError(404, 'Personagem-proficiência não encontrada');

    // Update related entities if provided
    if (updateDto.proficienciaid) {
      const proficiencia = await this.proficienciaRepository.findOne({ where: { proficienciaid: updateDto.proficienciaid } });
      if (!proficiencia) throw new ApiError(404, 'Proficiência não encontrada');
      personagemProficiencia.proficiencia = proficiencia;
    }

    if (updateDto.personagemid) {
      const personagem = await this.personagemRepository.findOne({ where: { personagemid: updateDto.personagemid } });
      if (!personagem) throw new ApiError(404, 'Personagem não encontrado');
      personagemProficiencia.personagem = personagem;
    }

    // Check for duplicate combination if changing proficiencia or personagem
    if (updateDto.proficienciaid || updateDto.personagemid) {
      const existing = await this.personagemProficienciaRepository.findOne({
        where: {
          proficiencia: { proficienciaid: updateDto.proficienciaid || personagemProficiencia.proficiencia.proficienciaid },
          personagem: { personagemid: updateDto.personagemid || personagemProficiencia.personagem.personagemid },
        },
      });
      if (existing && existing.personagemproficienciaid !== id) {
        throw new ApiError(400, 'Esta proficiência já está associada a este personagem');
      }
    }

    const updated = await this.personagemProficienciaRepository.save(personagemProficiencia);
    return this.mapToDto(updated);
  }

  async deletePersonagemProficiencia(id: string): Promise<void> {
    const result = await this.personagemProficienciaRepository.delete(id);
    if (result.affected === 0) throw new ApiError(404, 'Personagem-proficiência não encontrada');
  }

  private mapToDto(personagemProficiencia: Personagemproficienciat20): PersonagemProficienciaResponseDto {
    return {
      personagemproficienciaid: personagemProficiencia.personagemproficienciaid,
      proficienciaid: personagemProficiencia.proficiencia.proficienciaid,
      personagemid: personagemProficiencia.personagem.personagemid,
    };
  }
}