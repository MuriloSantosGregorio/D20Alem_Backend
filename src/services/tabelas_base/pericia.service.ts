import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../config/database';
import { Periciast20 } from '../../entities/Periciast20';
import { Atributot20 } from '../../entities/Atributost20';
import { CreatePericiaDto, UpdatePericiaDto, PericiaResponseDto } from '../../dtos/tabelas_base/pericia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

@Injectable()
export class PericiaService {
  private periciaRepository: Repository<Periciast20>;
  private atributoRepository: Repository<Atributot20>;

  constructor() {
    this.periciaRepository = AppDataSource.getRepository(Periciast20);
    this.atributoRepository = AppDataSource.getRepository(Atributot20);
  }

  async createPericia(createPericiaDto: CreatePericiaDto): Promise<PericiaResponseDto> {
    const { atributoid, ...periciaData } = createPericiaDto;
    
    const atributo = await this.atributoRepository.findOne({ where: { atributoid } });
    if (!atributo) {
      throw new ApiError(404, 'Atributo não encontrado');
    }

    const existingPericia = await this.periciaRepository.findOne({ 
      where: { pericianome: periciaData.pericianome } 
    });
    if (existingPericia) {
      throw new ApiError(400, 'Nome da perícia já está em uso');
    }

    const newPericia = this.periciaRepository.create({
      ...periciaData,
      atributoid: atributo
    });

    const savedPericia = await this.periciaRepository.save(newPericia);
    return this.mapToDto(savedPericia);
  }

  async getAllPericias(): Promise<PericiaResponseDto[]> {
    const pericias = await this.periciaRepository.find({ 
      relations: ['atributoid'],
      select: {
        periciaid: true,
        pericianome: true,
        periciaarmadura: true,
        periciatreinada: true,
        periciadescricao: true,
        atributoid: {
          atributoid: true,
          atributonome: true
        }
      }
    });
    
    return pericias.map(this.mapToDto);
  }

  async getPericiaById(id: string): Promise<PericiaResponseDto> {
    const pericia = await this.periciaRepository.findOne({ 
      where: { periciaid: id },
      relations: ['atributoid'],
      select: {
        periciaid: true,
        pericianome: true,
        periciaarmadura: true,
        periciatreinada: true,
        periciadescricao: true,
        atributoid: {
          atributoid: true,
          atributonome: true
        }
      }
    });
    
    if (!pericia) {
      throw new ApiError(404, 'Perícia não encontrada');
    }
    return this.mapToDto(pericia);
  }

  async updatePericia(id: string, updatePericiaDto: UpdatePericiaDto): Promise<PericiaResponseDto> {
    const pericia = await this.periciaRepository.findOne({ 
      where: { periciaid: id },
      relations: ['atributoid']
    });
    
    if (!pericia) {
      throw new ApiError(404, 'Perícia não encontrada');
    }

    if (updatePericiaDto.pericianome && updatePericiaDto.pericianome !== pericia.pericianome) {
      const existingPericia = await this.periciaRepository.findOne({ 
        where: { pericianome: updatePericiaDto.pericianome }
      });
      if (existingPericia) {
        throw new ApiError(400, 'Nome da perícia já está em uso');
      }
    }

    if (updatePericiaDto.atributoid) {
      const atributo = await this.atributoRepository.findOne({ 
        where: { atributoid: updatePericiaDto.atributoid }
      });
      if (!atributo) {
        throw new ApiError(404, 'Atributo não encontrado');
      }
      pericia.atributoid = atributo;
    }

    Object.assign(pericia, updatePericiaDto);
    const updatedPericia = await this.periciaRepository.save(pericia);
    return this.mapToDto(updatedPericia);
  }

  async deletePericia(id: string): Promise<void> {
    const result = await this.periciaRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Perícia não encontrada');
    }
  }

  private mapToDto(pericia: Periciast20): PericiaResponseDto {
    return {
      periciaid: pericia.periciaid,
      pericianome: pericia.pericianome,
      periciaarmadura: pericia.periciaarmadura,
      periciatreinada: pericia.periciatreinada,
      periciadescricao: pericia.periciadescricao,
      atributo: pericia.atributoid ? {
        atributoid: pericia.atributoid.atributoid,
        atributonome: pericia.atributoid.atributonome
      } : null
    };
  }
}