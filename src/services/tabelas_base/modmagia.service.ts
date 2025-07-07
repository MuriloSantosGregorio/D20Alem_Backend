import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../config/database';
import { Modmagiast20 } from '../../entities/Modmagiast20';
import { Magiast20 } from '../../entities/Magiast20';
import { CreateModMagiaDto, UpdateModMagiaDto, ModMagiaResponseDto } from '../../dtos/tabelas_base/modmagia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

@Injectable()
export class ModMagiaService {
  private modMagiaRepository: Repository<Modmagiast20>;
  private magiaRepository: Repository<Magiast20>;

  constructor() {
    this.modMagiaRepository = AppDataSource.getRepository(Modmagiast20);
    this.magiaRepository = AppDataSource.getRepository(Magiast20);
  }

  async createModMagia(createModMagiaDto: CreateModMagiaDto): Promise<ModMagiaResponseDto> {
    const { magiaid, ...modMagiaData } = createModMagiaDto;

    try {
      const magia = await this.magiaRepository.findOne({ where: { magiaid } });
      if (!magia) {
        throw new ApiError(404, 'Magia não encontrada');
      }

      const newModMagia = this.modMagiaRepository.create({
        ...modMagiaData,
        magia
      });

      const savedModMagia = await this.modMagiaRepository.save(newModMagia);
      return this.mapToDto(savedModMagia);
    } catch (error) {
      console.error('Erro em createModMagia:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao criar modificador de magia');
    }
  }

  async getAllModMagias(): Promise<ModMagiaResponseDto[]> {
    try {
      const modMagias = await this.modMagiaRepository.find({
        relations: ['magia']
      });
      console.log(`Encontrados ${modMagias.length} modificadores de magia`);
      return modMagias.map((modMagia) => {
        if (!modMagia.magia) {
          console.error('Relação incompleta:', modMagia);
          throw new ApiError(500, 'Dados de modificador de magia incompletos');
        }
        return this.mapToDto(modMagia);
      });
    } catch (error) {
      console.error('Erro em getAllModMagias:', error);
      throw new ApiError(500, 'Erro ao buscar modificadores de magia');
    }
  }

  async getModMagiaById(id: string): Promise<ModMagiaResponseDto> {
    try {
      const modMagia = await this.modMagiaRepository.findOne({
        where: { modmagiaid: id },
        relations: ['magia']
      });

      if (!modMagia) {
        throw new ApiError(404, 'Modificador de magia não encontrado');
      }
      if (!modMagia.magia) {
        console.error('Relação incompleta:', modMagia);
        throw new ApiError(500, 'Dados de modificador de magia incompletos');
      }
      return this.mapToDto(modMagia);
    } catch (error) {
      console.error('Erro em getModMagiaById:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao buscar modificador de magia');
    }
  }

  async updateModMagia(id: string, updateModMagiaDto: UpdateModMagiaDto): Promise<ModMagiaResponseDto> {
    try {
      const modMagia = await this.modMagiaRepository.findOne({
        where: { modmagiaid: id },
        relations: ['magia']
      });

      if (!modMagia) {
        throw new ApiError(404, 'Modificador de magia não encontrado');
      }

      if (updateModMagiaDto.magiaid) {
        const magia = await this.magiaRepository.findOne({ where: { magiaid: updateModMagiaDto.magiaid } });
        if (!magia) {
          throw new ApiError(404, 'Magia não encontrada');
        }
        modMagia.magia = magia;
      }

      Object.assign(modMagia, updateModMagiaDto);
      const updatedModMagia = await this.modMagiaRepository.save(modMagia);
      return this.mapToDto(updatedModMagia);
    } catch (error) {
      console.error('Erro em updateModMagia:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao atualizar modificador de magia');
    }
  }

  async deleteModMagia(id: string): Promise<void> {
    try {
      const result = await this.modMagiaRepository.delete(id);
      if (result.affected === 0) {
        throw new ApiError(404, 'Modificador de magia não encontrado');
      }
    } catch (error) {
      console.error('Erro em deleteModMagia:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao deletar modificador de magia');
    }
  }

  private mapToDto(modMagia: Modmagiast20): ModMagiaResponseDto {
    return {
      modmagiaid: modMagia.modmagiaid,
      modmagiacusto: modMagia.modmagiacusto,
      modmagiadescricao: modMagia.modmagiadescricao,
      modmagiaexclusivo: modMagia.modmagiaexclusivo,
      magia: {
        magiaid: modMagia.magia.magiaid,
        magianome: modMagia.magia.magianome
      }
    };
  }
}