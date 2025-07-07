import { AppDataSource } from '../../config/database';
import { Racast20 } from '../../entities/Racast20';
import { CreateRacaDto, UpdateRacaDto, RacaResponseDto } from '../../dtos/tabelas_base/raca.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';
import { Tamanhost20 } from '../../entities/Tamanhost20';

export class RacaService {
  private racaRepository: Repository<Racast20>;
  private tamanhoRepository: Repository<Tamanhost20>;

  constructor() {
    this.racaRepository = AppDataSource.getRepository(Racast20);
    this.tamanhoRepository = AppDataSource.getRepository(Tamanhost20);
  }

  async createRaca(createRacaDto: CreateRacaDto): Promise<RacaResponseDto> {
    const { tamanhoid, ...racaData } = createRacaDto;
    
    const tamanho = await this.tamanhoRepository.findOne({ where: { tamanhoid } });
    if (!tamanho) {
      throw new ApiError(404, 'Tamanho não encontrado');
    }

    const existingRaca = await this.racaRepository.findOne({ where: { racanome: racaData.racanome } });
    if (existingRaca) {
      throw new ApiError(400, 'Nome da raça já está em uso');
    }

    const newRaca = this.racaRepository.create({
      ...racaData,
      tamanho
    });

    const savedRaca = await this.racaRepository.save(newRaca);
    return this.mapToDto(savedRaca);
  }

  async getAllRacas(): Promise<RacaResponseDto[]> {
    const racas = await this.racaRepository.find({ relations: ['tamanho'] });
    return racas.map(this.mapToDto);
  }

  async getRacaById(id: string): Promise<RacaResponseDto> {
    const raca = await this.racaRepository.findOne({ 
      where: { racaid: id },
      relations: ['tamanho']
    });
    
    if (!raca) {
      throw new ApiError(404, 'Raça não encontrada');
    }
    return this.mapToDto(raca);
  }

  async updateRaca(id: string, updateRacaDto: UpdateRacaDto): Promise<RacaResponseDto> {
    const raca = await this.racaRepository.findOne({ 
      where: { racaid: id },
      relations: ['tamanho']
    });
    
    if (!raca) {
      throw new ApiError(404, 'Raça não encontrada');
    }

    if (updateRacaDto.racanome && updateRacaDto.racanome !== raca.racanome) {
      const existingRaca = await this.racaRepository.findOne({ 
        where: { racanome: updateRacaDto.racanome }
      });
      if (existingRaca) {
        throw new ApiError(400, 'Nome da raça já está em uso');
      }
    }

    if (updateRacaDto.tamanhoid) {
      const tamanho = await this.tamanhoRepository.findOne({ 
        where: { tamanhoid: updateRacaDto.tamanhoid }
      });
      if (!tamanho) {
        throw new ApiError(404, 'Tamanho não encontrado');
      }
      raca.tamanho = tamanho;
    }

    Object.assign(raca, updateRacaDto);
    const updatedRaca = await this.racaRepository.save(raca);
    return this.mapToDto(updatedRaca);
  }

  async deleteRaca(id: string): Promise<void> {
    const result = await this.racaRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Raça não encontrada');
    }
  }

  private mapToDto(raca: Racast20): RacaResponseDto {
    return {
      racaid: raca.racaid,
      racanome: raca.racanome,
      racadescricao: raca.racadescricao,
      tamanho: {
        tamanhoid: raca.tamanho.tamanhoid,
        tamanhocategoria: raca.tamanho.tamanhocategoria
      }
    };
  }
}