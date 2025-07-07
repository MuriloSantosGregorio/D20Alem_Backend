import { AppDataSource } from '../../config/database';
import { Racaatributot20 } from '../../entities/Racaatributot20';
import { Racast20 } from '../../entities/Racast20';
import { Atributot20 } from '../../entities/Atributost20';
import { CreateRacaAtributoDto, UpdateRacaAtributoDto, RacaAtributoResponseDto } from '../../dtos/tabelas_relacionamento/racaatributo.dto';
import { Repository, Not, IsNull } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class RacaAtributoService {
  private racaAtributoRepository: Repository<Racaatributot20>;
  private racaRepository: Repository<Racast20>;
  private atributoRepository: Repository<Atributot20>;

  constructor() {
    this.racaAtributoRepository = AppDataSource.getRepository(Racaatributot20);
    this.racaRepository = AppDataSource.getRepository(Racast20);
    this.atributoRepository = AppDataSource.getRepository(Atributot20);
  }

  async createRacaAtributo(createRacaAtributoDto: CreateRacaAtributoDto): Promise<RacaAtributoResponseDto> {
    const { racaid, atributoid } = createRacaAtributoDto;

    const raca = await this.racaRepository.findOne({ where: { racaid } });
    if (!raca) {
      throw new ApiError(404, 'Raça não encontrada');
    }

    const atributo = await this.atributoRepository.findOne({ where: { atributoid } });
    if (!atributo) {
      throw new ApiError(404, 'Atributo não encontrado');
    }

    const existingRelation = await this.racaAtributoRepository.findOne({
      where: { raca: { racaid }, atributo: { atributoid } }
    });
    if (existingRelation) {
      throw new ApiError(400, 'Relação entre raça e atributo já existe');
    }

    const newRacaAtributo = this.racaAtributoRepository.create({
      ...createRacaAtributoDto,
      raca,
      atributo
    });

    const savedRacaAtributo = await this.racaAtributoRepository.save(newRacaAtributo);
    return this.mapToDto(savedRacaAtributo);
  }

  async getAllRacaAtributos(): Promise<RacaAtributoResponseDto[]> {
    try {
      const racaAtributos = await this.racaAtributoRepository.find({
        relations: ['raca', 'atributo'],
        where: {
          raca: { racaid: Not(IsNull()) },
          atributo: { atributoid: Not(IsNull()) }
        }
      });
      return racaAtributos.map(racaAtributo => this.mapToDto(racaAtributo));
    } catch (error) {
      console.error('Erro ao buscar relações raça-atributo:', error);
      throw new ApiError(500, 'Erro ao buscar relações raça-atributo');
    }
  }

  async getRacaAtributoById(id: string): Promise<RacaAtributoResponseDto> {
    const racaAtributo = await this.racaAtributoRepository.findOne({
      where: { racaatributoid: id },
      relations: ['raca', 'atributo']
    });
    if (!racaAtributo) {
      throw new ApiError(404, 'Relação raça-atributo não encontrada');
    }
    return this.mapToDto(racaAtributo);
  }

  async updateRacaAtributo(id: string, updateRacaAtributoDto: UpdateRacaAtributoDto): Promise<RacaAtributoResponseDto> {
    const racaAtributo = await this.racaAtributoRepository.findOne({
      where: { racaatributoid: id },
      relations: ['raca', 'atributo']
    });
    if (!racaAtributo) {
      throw new ApiError(404, 'Relação raça-atributo não encontrada');
    }

    if (updateRacaAtributoDto.racaid) {
      const raca = await this.racaRepository.findOne({ where: { racaid: updateRacaAtributoDto.racaid } });
      if (!raca) {
        throw new ApiError(404, 'Raça não encontrada');
      }
      racaAtributo.raca = raca;
    }

    if (updateRacaAtributoDto.atributoid) {
      const atributo = await this.atributoRepository.findOne({ where: { atributoid: updateRacaAtributoDto.atributoid } });
      if (!atributo) {
        throw new ApiError(404, 'Atributo não encontrado');
      }
      racaAtributo.atributo = atributo;
    }

    if (updateRacaAtributoDto.racaid && updateRacaAtributoDto.atributoid) {
      const existingRelation = await this.racaAtributoRepository.findOne({
        where: {
          raca: { racaid: updateRacaAtributoDto.racaid },
          atributo: { atributoid: updateRacaAtributoDto.atributoid }
        }
      });
      if (existingRelation && existingRelation.racaatributoid !== id) {
        throw new ApiError(400, 'Relação entre raça e atributo já existe');
      }
    }

    Object.assign(racaAtributo, updateRacaAtributoDto);
    const updatedRacaAtributo = await this.racaAtributoRepository.save(racaAtributo);
    return this.mapToDto(updatedRacaAtributo);
  }

  async deleteRacaAtributo(id: string): Promise<void> {
    const result = await this.racaAtributoRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Relação raça-atributo não encontrada');
    }
  }

  private mapToDto(racaAtributo: Racaatributot20): RacaAtributoResponseDto {
    if (!racaAtributo.raca || !racaAtributo.atributo) {
      throw new ApiError(500, 'Relação raça-atributo inválida: raça ou atributo ausente');
    }
    return {
      racaatributoid: racaAtributo.racaatributoid,
      racaid: racaAtributo.raca.racaid,
      atributoid: racaAtributo.atributo.atributoid,
      racaatributovalor: racaAtributo.racaatributovalor,
      racaatributotipo: racaAtributo.racaatributotipo
    };
  }
}