import { AppDataSource } from '../../config/database';
import { Personagemhabilidadet20 } from '../../entities/Personagemhabilidadet20';
import { Habilidadest20 } from '../../entities/Habilidadest20';
import { Personagenst20 } from '../../entities/Personagenst20';
import { CreatePersonagemHabilidadeDto, UpdatePersonagemHabilidadeDto, PersonagemHabilidadeResponseDto } from '../../dtos/tabelas_relacionamento/personagemhabilidade.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class PersonagemHabilidadeService {
  private personagemHabilidadeRepository: Repository<Personagemhabilidadet20>;
  private habilidadeRepository: Repository<Habilidadest20>;
  private personagemRepository: Repository<Personagenst20>;

  constructor() {
    this.personagemHabilidadeRepository = AppDataSource.getRepository(Personagemhabilidadet20);
    this.habilidadeRepository = AppDataSource.getRepository(Habilidadest20);
    this.personagemRepository = AppDataSource.getRepository(Personagenst20);
  }

  async createPersonagemHabilidade(createDto: CreatePersonagemHabilidadeDto): Promise<PersonagemHabilidadeResponseDto> {
    const { habilidadeid, personagemid, personagemhabilidadefonte } = createDto;

    // Verify related entities
    const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid } });
    if (!habilidade) throw new ApiError(404, 'Habilidade não encontrada');

    const personagem = await this.personagemRepository.findOne({ where: { personagemid } });
    if (!personagem) throw new ApiError(404, 'Personagem não encontrado');

    // Check for existing personagem-habilidade combination
    const existing = await this.personagemHabilidadeRepository.findOne({
      where: { habilidade: { habilidadeid }, personagem: { personagemid } },
    });
    if (existing) throw new ApiError(400, 'Esta habilidade já está associada a este personagem');

    const newPersonagemHabilidade = this.personagemHabilidadeRepository.create({
      personagemhabilidadefonte,
      habilidade,
      personagem,
    });

    const saved = await this.personagemHabilidadeRepository.save(newPersonagemHabilidade);
    return this.mapToDto(saved);
  }

  async getAllPersonagemHabilidades(): Promise<PersonagemHabilidadeResponseDto[]> {
    const personagemHabilidades = await this.personagemHabilidadeRepository.find({
      relations: ['habilidade', 'personagem'],
    });
    return personagemHabilidades.map(this.mapToDto);
  }

  async getPersonagemHabilidadeById(id: string): Promise<PersonagemHabilidadeResponseDto> {
    const personagemHabilidade = await this.personagemHabilidadeRepository.findOne({
      where: { personagemhabilidadeid: id },
      relations: ['habilidade', 'personagem'],
    });
    if (!personagemHabilidade) throw new ApiError(404, 'Personagem-habilidade não encontrada');
    return this.mapToDto(personagemHabilidade);
  }

  async updatePersonagemHabilidade(id: string, updateDto: UpdatePersonagemHabilidadeDto): Promise<PersonagemHabilidadeResponseDto> {
    const personagemHabilidade = await this.personagemHabilidadeRepository.findOne({
      where: { personagemhabilidadeid: id },
      relations: ['habilidade', 'personagem'],
    });
    if (!personagemHabilidade) throw new ApiError(404, 'Personagem-habilidade não encontrada');

    // Update related entities if provided
    if (updateDto.habilidadeid) {
      const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid: updateDto.habilidadeid } });
      if (!habilidade) throw new ApiError(404, 'Habilidade não encontrada');
      personagemHabilidade.habilidade = habilidade;
    }

    if (updateDto.personagemid) {
      const personagem = await this.personagemRepository.findOne({ where: { personagemid: updateDto.personagemid } });
      if (!personagem) throw new ApiError(404, 'Personagem não encontrado');
      personagemHabilidade.personagem = personagem;
    }

    // Check for duplicate combination if changing habilidade or personagem
    if (updateDto.habilidadeid || updateDto.personagemid) {
      const existing = await this.personagemHabilidadeRepository.findOne({
        where: {
          habilidade: { habilidadeid: updateDto.habilidadeid || personagemHabilidade.habilidade.habilidadeid },
          personagem: { personagemid: updateDto.personagemid || personagemHabilidade.personagem.personagemid },
        },
      });
      if (existing && existing.personagemhabilidadeid !== id) {
        throw new ApiError(400, 'Esta habilidade já está associada a este personagem');
      }
    }

    // Update simple fields
    if (updateDto.personagemhabilidadefonte !== undefined) {
      personagemHabilidade.personagemhabilidadefonte = updateDto.personagemhabilidadefonte;
    }

    const updated = await this.personagemHabilidadeRepository.save(personagemHabilidade);
    return this.mapToDto(updated);
  }

  async deletePersonagemHabilidade(id: string): Promise<void> {
    const result = await this.personagemHabilidadeRepository.delete(id);
    if (result.affected === 0) throw new ApiError(404, 'Personagem-habilidade não encontrada');
  }

  private mapToDto(personagemHabilidade: Personagemhabilidadet20): PersonagemHabilidadeResponseDto {
    return {
      personagemhabilidadeid: personagemHabilidade.personagemhabilidadeid,
      personagemhabilidadefonte: personagemHabilidade.personagemhabilidadefonte,
      habilidadeid: personagemHabilidade.habilidade.habilidadeid,
      personagemid: personagemHabilidade.personagem.personagemid,
    };
  }
}