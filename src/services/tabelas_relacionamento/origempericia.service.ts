import { AppDataSource } from '../../config/database';
import { Origempericiat20 } from '../../entities/Origempericiat20';
import { Origenst20 } from '../../entities/Origenst20';
import { Periciast20 } from '../../entities/Periciast20';
import { CreateOrigemPericiaDto, UpdateOrigemPericiaDto, OrigemPericiaResponseDto } from '../../dtos/tabelas_relacionamento/origempericia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class OrigemPericiaService {
  private origemPericiaRepository: Repository<Origempericiat20>;
  private origemRepository: Repository<Origenst20>;
  private periciaRepository: Repository<Periciast20>;

  constructor() {
    this.origemPericiaRepository = AppDataSource.getRepository(Origempericiat20);
    this.origemRepository = AppDataSource.getRepository(Origenst20);
    this.periciaRepository = AppDataSource.getRepository(Periciast20);
  }

  async createOrigemPericia(createOrigemPericiaDto: CreateOrigemPericiaDto): Promise<OrigemPericiaResponseDto> {
    const { origemid, periciaid } = createOrigemPericiaDto;

    const origem = await this.origemRepository.findOne({ where: { origemid } });
    if (!origem) {
      throw new ApiError(404, 'Origem não encontrada');
    }

    const pericia = await this.periciaRepository.findOne({ where: { periciaid } });
    if (!pericia) {
      throw new ApiError(404, 'Perícia não encontrada');
    }

    const existingRelation = await this.origemPericiaRepository.findOne({
      where: { origem: { origemid }, pericia: { periciaid } }
    });
    if (existingRelation) {
      throw new ApiError(400, 'Relação entre origem e perícia já existe');
    }

    const newOrigemPericia = this.origemPericiaRepository.create({
      origem,
      pericia
    });

    const savedOrigemPericia = await this.origemPericiaRepository.save(newOrigemPericia);
    return this.mapToDto(savedOrigemPericia);
  }

  async getAllOrigemPericias(): Promise<OrigemPericiaResponseDto[]> {
    const origemPericias = await this.origemPericiaRepository.find({ relations: ['origem', 'pericia'] });
    return origemPericias.map(this.mapToDto);
  }

  async getOrigemPericiaById(id: string): Promise<OrigemPericiaResponseDto> {
    const origemPericia = await this.origemPericiaRepository.findOne({
      where: { origempericiaid: id },
      relations: ['origem', 'pericia']
    });
    if (!origemPericia) {
      throw new ApiError(404, 'Relação origem-perícia não encontrada');
    }
    return this.mapToDto(origemPericia);
  }

  async updateOrigemPericia(id: string, updateOrigemPericiaDto: UpdateOrigemPericiaDto): Promise<OrigemPericiaResponseDto> {
    const origemPericia = await this.origemPericiaRepository.findOne({
      where: { origempericiaid: id },
      relations: ['origem', 'pericia']
    });
    if (!origemPericia) {
      throw new ApiError(404, 'Relação origem-perícia não encontrada');
    }

    if (updateOrigemPericiaDto.origemid) {
      const origem = await this.origemRepository.findOne({ where: { origemid: updateOrigemPericiaDto.origemid } });
      if (!origem) {
        throw new ApiError(404, 'Origem não encontrada');
      }
      origemPericia.origem = origem;
    }

    if (updateOrigemPericiaDto.periciaid) {
      const pericia = await this.periciaRepository.findOne({ where: { periciaid: updateOrigemPericiaDto.periciaid } });
      if (!pericia) {
        throw new ApiError(404, 'Perícia não encontrada');
      }
      origemPericia.pericia = pericia;
    }

    if (updateOrigemPericiaDto.origemid && updateOrigemPericiaDto.periciaid) {
      const existingRelation = await this.origemPericiaRepository.findOne({
        where: {
          origem: { origemid: updateOrigemPericiaDto.origemid },
          pericia: { periciaid: updateOrigemPericiaDto.periciaid }
        }
      });
      if (existingRelation && existingRelation.origempericiaid !== id) {
        throw new ApiError(400, 'Relação entre origem e perícia já existe');
      }
    }

    const updatedOrigemPericia = await this.origemPericiaRepository.save(origemPericia);
    return this.mapToDto(updatedOrigemPericia);
  }

  async deleteOrigemPericia(id: string): Promise<void> {
    const result = await this.origemPericiaRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Relação origem-perícia não encontrada');
    }
  }

  private mapToDto(origemPericia: Origempericiat20): OrigemPericiaResponseDto {
    return {
      origempericiaid: origemPericia.origempericiaid,
      origemid: origemPericia.origem.origemid,
      periciaid: origemPericia.pericia.periciaid
    };
  }
}