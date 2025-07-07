import { AppDataSource } from '../../config/database';
import { Deusracat20 } from '../../entities/Deusracat20';
import { Deusest20 } from '../../entities/Deusest20';
import { Racast20 } from '../../entities/Racast20';
import { CreateDeusRacaDto, UpdateDeusRacaDto, DeusRacaResponseDto } from '../../dtos/tabelas_relacionamento/deusraca.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class DeusRacaService {
  private deusRacaRepository: Repository<Deusracat20>;
  private deusRepository: Repository<Deusest20>;
  private racaRepository: Repository<Racast20>;

  constructor() {
    this.deusRacaRepository = AppDataSource.getRepository(Deusracat20);
    this.deusRepository = AppDataSource.getRepository(Deusest20);
    this.racaRepository = AppDataSource.getRepository(Racast20);
  }

  async createDeusRaca(createDeusRacaDto: CreateDeusRacaDto): Promise<DeusRacaResponseDto> {
    const { deusid, racaid } = createDeusRacaDto;

    const deus = await this.deusRepository.findOne({ where: { deusid } });
    if (!deus) {
      throw new ApiError(404, 'Deus não encontrado');
    }

    const raca = await this.racaRepository.findOne({ where: { racaid } });
    if (!raca) {
      throw new ApiError(404, 'Raça não encontrada');
    }

    const existingRelation = await this.deusRacaRepository.findOne({
      where: { deus: { deusid }, raca: { racaid } }
    });
    if (existingRelation) {
      throw new ApiError(400, 'Relação entre deus e raça já existe');
    }

    const newDeusRaca = this.deusRacaRepository.create({
      deus,
      raca
    });

    const savedDeusRaca = await this.deusRacaRepository.save(newDeusRaca);
    return this.mapToDto(savedDeusRaca);
  }

  async getAllDeusRacas(): Promise<DeusRacaResponseDto[]> {
    const deusRacas = await this.deusRacaRepository.find({ relations: ['deus', 'raca'] });
    return deusRacas.map(this.mapToDto);
  }

  async getDeusRacaById(id: string): Promise<DeusRacaResponseDto> {
    const deusRaca = await this.deusRacaRepository.findOne({
      where: { deusracaid: id },
      relations: ['deus', 'raca']
    });
    if (!deusRaca) {
      throw new ApiError(404, 'Relação deus-raça não encontrada');
    }
    return this.mapToDto(deusRaca);
  }

  async updateDeusRaca(id: string, updateDeusRacaDto: UpdateDeusRacaDto): Promise<DeusRacaResponseDto> {
    const deusRaca = await this.deusRacaRepository.findOne({
      where: { deusracaid: id },
      relations: ['deus', 'raca']
    });
    if (!deusRaca) {
      throw new ApiError(404, 'Relação deus-raça não encontrada');
    }

    if (updateDeusRacaDto.deusid) {
      const deus = await this.deusRepository.findOne({ where: { deusid: updateDeusRacaDto.deusid } });
      if (!deus) {
        throw new ApiError(404, 'Deus não encontrado');
      }
      deusRaca.deus = deus;
    }

    if (updateDeusRacaDto.racaid) {
      const raca = await this.racaRepository.findOne({ where: { racaid: updateDeusRacaDto.racaid } });
      if (!raca) {
        throw new ApiError(404, 'Raça não encontrada');
      }
      deusRaca.raca = raca;
    }

    if (updateDeusRacaDto.deusid && updateDeusRacaDto.racaid) {
      const existingRelation = await this.deusRacaRepository.findOne({
        where: {
          deus: { deusid: updateDeusRacaDto.deusid },
          raca: { racaid: updateDeusRacaDto.racaid }
        }
      });
      if (existingRelation && existingRelation.deusracaid !== id) {
        throw new ApiError(400, 'Relação entre deus e raça já existe');
      }
    }

    const updatedDeusRaca = await this.deusRacaRepository.save(deusRaca);
    return this.mapToDto(updatedDeusRaca);
  }

  async deleteDeusRaca(id: string): Promise<void> {
    const result = await this.deusRacaRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Relação deus-raça não encontrada');
    }
  }

  private mapToDto(deusRaca: Deusracat20): DeusRacaResponseDto {
    return {
      deusracaid: deusRaca.deusracaid,
      deusid: deusRaca.deus.deusid,
      racaid: deusRaca.raca.racaid
    };
  }
}