import { AppDataSource } from '../../config/database';
import { Racahabilidadet20 } from '../../entities/Racahabilidadet20';
import { Racast20 } from '../../entities/Racast20';
import { Habilidadest20 } from '../../entities/Habilidadest20';
import { CreateRacaHabilidadeDto, UpdateRacaHabilidadeDto, RacaHabilidadeResponseDto } from '../../dtos/tabelas_relacionamento/racahabilidade.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class RacaHabilidadeService {
  private racaHabilidadeRepository: Repository<Racahabilidadet20>;
  private racaRepository: Repository<Racast20>;
  private habilidadeRepository: Repository<Habilidadest20>;

  constructor() {
    this.racaHabilidadeRepository = AppDataSource.getRepository(Racahabilidadet20);
    this.racaRepository = AppDataSource.getRepository(Racast20);
    this.habilidadeRepository = AppDataSource.getRepository(Habilidadest20);
  }

  async createRacaHabilidade(createRacaHabilidadeDto: CreateRacaHabilidadeDto): Promise<RacaHabilidadeResponseDto> {
    const { racaid, habilidadeid } = createRacaHabilidadeDto;

    const raca = await this.racaRepository.findOne({ where: { racaid } });
    if (!raca) {
      throw new ApiError(404, 'Raça não encontrada');
    }

    const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid } });
    if (!habilidade) {
      throw new ApiError(404, 'Habilidade não encontrada');
    }

    const existingRelation = await this.racaHabilidadeRepository.findOne({
      where: { raca: { racaid }, habilidade: { habilidadeid } }
    });
    if (existingRelation) {
      throw new ApiError(400, 'Relação entre raça e habilidade já existe');
    }

    const newRacaHabilidade = this.racaHabilidadeRepository.create({
      ...createRacaHabilidadeDto,
      raca,
      habilidade
    });

    const savedRacaHabilidade = await this.racaHabilidadeRepository.save(newRacaHabilidade);
    return this.mapToDto(savedRacaHabilidade);
  }

  async getAllRacaHabilidades(): Promise<RacaHabilidadeResponseDto[]> {
    const racaHabilidades = await this.racaHabilidadeRepository.find({ relations: ['raca', 'habilidade'] });
    return racaHabilidades.map(this.mapToDto);
  }

  async getRacaHabilidadeById(id: string): Promise<RacaHabilidadeResponseDto> {
    const racaHabilidade = await this.racaHabilidadeRepository.findOne({
      where: { racahabilidadeid: id },
      relations: ['raca', 'habilidade']
    });
    if (!racaHabilidade) {
      throw new ApiError(404, 'Relação raça-habilidade não encontrada');
    }
    return this.mapToDto(racaHabilidade);
  }

  async updateRacaHabilidade(id: string, updateRacaHabilidadeDto: UpdateRacaHabilidadeDto): Promise<RacaHabilidadeResponseDto> {
    const racaHabilidade = await this.racaHabilidadeRepository.findOne({
      where: { racahabilidadeid: id },
      relations: ['raca', 'habilidade']
    });
    if (!racaHabilidade) {
      throw new ApiError(404, 'Relação raça-habilidade não encontrada');
    }

    if (updateRacaHabilidadeDto.racaid) {
      const raca = await this.racaRepository.findOne({ where: { racaid: updateRacaHabilidadeDto.racaid } });
      if (!raca) {
        throw new ApiError(404, 'Raça não encontrada');
      }
      racaHabilidade.raca = raca;
    }

    if (updateRacaHabilidadeDto.habilidadeid) {
      const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid: updateRacaHabilidadeDto.habilidadeid } });
      if (!habilidade) {
        throw new ApiError(404, 'Habilidade não encontrada');
      }
      racaHabilidade.habilidade = habilidade;
    }

    if (updateRacaHabilidadeDto.racaid && updateRacaHabilidadeDto.habilidadeid) {
      const existingRelation = await this.racaHabilidadeRepository.findOne({
        where: {
          raca: { racaid: updateRacaHabilidadeDto.racaid },
          habilidade: { habilidadeid: updateRacaHabilidadeDto.habilidadeid }
        }
      });
      if (existingRelation && existingRelation.racahabilidadeid !== id) {
        throw new ApiError(400, 'Relação entre raça e habilidade já existe');
      }
    }

    Object.assign(racaHabilidade, updateRacaHabilidadeDto);
    const updatedRacaHabilidade = await this.racaHabilidadeRepository.save(racaHabilidade);
    return this.mapToDto(updatedRacaHabilidade);
  }

  async deleteRacaHabilidade(id: string): Promise<void> {
    const result = await this.racaHabilidadeRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Relação raça-habilidade não encontrada');
    }
  }

  private mapToDto(racaHabilidade: Racahabilidadet20): RacaHabilidadeResponseDto {
    return {
      racahabilidadeid: racaHabilidade.racahabilidadeid,
      racaid: racaHabilidade.raca.racaid,
      habilidadeid: racaHabilidade.habilidade.habilidadeid,
      racahabilidademodular: racaHabilidade.racahabilidademodular
    };
  }
}