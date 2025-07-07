import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../config/database';
import { Classepericiat20 } from '../../entities/Classepericiat20';
import { Classest20 } from '../../entities/Classest20';
import { Periciast20 } from '../../entities/Periciast20';
import { CreateClassePericiaDto, UpdateClassePericiaDto, ClassePericiaResponseDto } from '../../dtos/tabelas_relacionamento/classepericia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

@Injectable()
export class ClassePericiaService {
  private classePericiaRepository: Repository<Classepericiat20>;
  private classeRepository: Repository<Classest20>;
  private periciaRepository: Repository<Periciast20>;

  constructor() {
    this.classePericiaRepository = AppDataSource.getRepository(Classepericiat20);
    this.classeRepository = AppDataSource.getRepository(Classest20);
    this.periciaRepository = AppDataSource.getRepository(Periciast20);
  }

  async createClassePericia(createClassePericiaDto: CreateClassePericiaDto): Promise<ClassePericiaResponseDto> {
    const { classeid, periciaid, classepericiatipo } = createClassePericiaDto;

    try {
      const classe = await this.classeRepository.findOne({ where: { classeid } });
      if (!classe) {
        throw new ApiError(404, 'Classe não encontrada');
      }

      const pericia = await this.periciaRepository.findOne({ where: { periciaid } });
      if (!pericia) {
        throw new ApiError(404, 'Perícia não encontrada');
      }

      const existingRelation = await this.classePericiaRepository.findOne({
        where: { classe: { classeid }, pericia: { periciaid } }
      });
      if (existingRelation) {
        throw new ApiError(400, 'Relação entre classe e perícia já existe');
      }

      const newClassePericia = this.classePericiaRepository.create({
        classepericiatipo,
        classe,
        pericia
      });

      const savedClassePericia = await this.classePericiaRepository.save(newClassePericia);
      return this.mapToDto(savedClassePericia);
    } catch (error) {
      console.error('Erro em createClassePericia:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao criar relação classe-perícia');
    }
  }

  async getAllClassePericias(): Promise<ClassePericiaResponseDto[]> {
    try {
      const classePericias = await this.classePericiaRepository.find({
        relations: ['classe', 'pericia']
      });
      console.log(`Encontradas ${classePericias.length} relações classe-perícia`);
      return classePericias.map((classePericia) => {
        if (!classePericia.classe || !classePericia.pericia) {
          console.error('Relação incompleta:', classePericia);
          throw new ApiError(500, 'Dados de relação classe-perícia incompletos');
        }
        return this.mapToDto(classePericia);
      });
    } catch (error) {
      console.error('Erro em getAllClassePericias:', error);
      throw new ApiError(500, 'Erro ao buscar relações classe-perícia');
    }
  }

  async getClassePericiaById(id: string): Promise<ClassePericiaResponseDto> {
    try {
      const classePericia = await this.classePericiaRepository.findOne({
        where: { classepericiaid: id },
        relations: ['classe', 'pericia']
      });

      if (!classePericia) {
        throw new ApiError(404, 'Relação classe-perícia não encontrada');
      }
      if (!classePericia.classe || !classePericia.pericia) {
        console.error('Relação incompleta:', classePericia);
        throw new ApiError(500, 'Dados de relação classe-perícia incompletos');
      }
      return this.mapToDto(classePericia);
    } catch (error) {
      console.error('Erro em getClassePericiaById:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao buscar relação classe-perícia');
    }
  }

  async updateClassePericia(id: string, updateClassePericiaDto: UpdateClassePericiaDto): Promise<ClassePericiaResponseDto> {
    try {
      const classePericia = await this.classePericiaRepository.findOne({
        where: { classepericiaid: id },
        relations: ['classe', 'pericia']
      });

      if (!classePericia) {
        throw new ApiError(404, 'Relação classe-perícia não encontrada');
      }

      if (updateClassePericiaDto.classeid) {
        const classe = await this.classeRepository.findOne({ where: { classeid: updateClassePericiaDto.classeid } });
        if (!classe) {
          throw new ApiError(404, 'Classe não encontrada');
        }
        classePericia.classe = classe;
      }

      if (updateClassePericiaDto.periciaid) {
        const pericia = await this.periciaRepository.findOne({ where: { periciaid: updateClassePericiaDto.periciaid } });
        if (!pericia) {
          throw new ApiError(404, 'Perícia não encontrada');
        }
        classePericia.pericia = pericia;
      }

      if (updateClassePericiaDto.classeid && updateClassePericiaDto.periciaid) {
        const existingRelation = await this.classePericiaRepository.findOne({
          where: { 
            classe: { classeid: updateClassePericiaDto.classeid },
            pericia: { periciaid: updateClassePericiaDto.periciaid }
          }
        });
        if (existingRelation && existingRelation.classepericiaid !== id) {
          throw new ApiError(400, 'Relação entre classe e perícia já existe');
        }
      }

      Object.assign(classePericia, updateClassePericiaDto);
      const updatedClassePericia = await this.classePericiaRepository.save(classePericia);
      return this.mapToDto(updatedClassePericia);
    } catch (error) {
      console.error('Erro em updateClassePericia:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao atualizar relação classe-perícia');
    }
  }

  async deleteClassePericia(id: string): Promise<void> {
    try {
      const result = await this.classePericiaRepository.delete(id);
      if (result.affected === 0) {
        throw new ApiError(404, 'Relação classe-perícia não encontrada');
      }
    } catch (error) {
      console.error('Erro em deleteClassePericia:', error);
      throw error instanceof ApiError ? error : new ApiError(500, 'Erro ao deletar relação classe-perícia');
    }
  }

  private mapToDto(classePericia: Classepericiat20): ClassePericiaResponseDto {
    return {
      classepericiaid: classePericia.classepericiaid,
      classepericiatipo: classePericia.classepericiatipo,
      classe: {
        classeid: classePericia.classe.classeid,
        classenome: classePericia.classe.classenome
      },
      pericia: {
        periciaid: classePericia.pericia.periciaid,
        pericianome: classePericia.pericia.pericianome
      }
    };
  }
}