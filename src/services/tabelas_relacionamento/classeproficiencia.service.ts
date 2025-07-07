import { AppDataSource } from '../../config/database';
import { Classeproficienciat20 } from '../../entities/Classeproficienciat20';
import { Classest20 } from '../../entities/Classest20';
import { Proficienciast20 } from '../../entities/Proficienciast20';
import { CreateClasseProficienciaDto, UpdateClasseProficienciaDto, ClasseProficienciaResponseDto } from '../../dtos/tabelas_relacionamento/classeproficiencia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class ClasseProficienciaService {
  private classeProficienciaRepository: Repository<Classeproficienciat20>;
  private classeRepository: Repository<Classest20>;
  private proficienciaRepository: Repository<Proficienciast20>;

  constructor() {
    this.classeProficienciaRepository = AppDataSource.getRepository(Classeproficienciat20);
    this.classeRepository = AppDataSource.getRepository(Classest20);
    this.proficienciaRepository = AppDataSource.getRepository(Proficienciast20);
  }

  async createClasseProficiencia(createClasseProficienciaDto: CreateClasseProficienciaDto): Promise<ClasseProficienciaResponseDto> {
    const { classeid, proficienciaid } = createClasseProficienciaDto;

    const classe = await this.classeRepository.findOne({ where: { classeid } });
    if (!classe) {
      throw new ApiError(404, 'Classe não encontrada');
    }

    const proficiencia = await this.proficienciaRepository.findOne({ where: { proficienciaid } });
    if (!proficiencia) {
      throw new ApiError(404, 'Proficiência não encontrada');
    }

    const existingRelation = await this.classeProficienciaRepository.findOne({
      where: { classe: { classeid }, proficiencia: { proficienciaid } }
    });
    if (existingRelation) {
      throw new ApiError(400, 'Relação entre classe e proficiência já existe');
    }

    const newClasseProficiencia = this.classeProficienciaRepository.create({
      classe,
      proficiencia
    });

    const savedClasseProficiencia = await this.classeProficienciaRepository.save(newClasseProficiencia);
    return this.mapToDto(savedClasseProficiencia);
  }

  async getAllClasseProficiencias(): Promise<ClasseProficienciaResponseDto[]> {
    const classeProficiencias = await this.classeProficienciaRepository.find({ relations: ['classe', 'proficiencia'] });
    return classeProficiencias.map(this.mapToDto);
  }

  async getClasseProficienciaById(id: string): Promise<ClasseProficienciaResponseDto> {
    const classeProficiencia = await this.classeProficienciaRepository.findOne({
      where: { classeproficienciaid: id },
      relations: ['classe', 'proficiencia']
    });
    if (!classeProficiencia) {
      throw new ApiError(404, 'Relação classe-proficiência não encontrada');
    }
    return this.mapToDto(classeProficiencia);
  }

  async updateClasseProficiencia(id: string, updateClasseProficienciaDto: UpdateClasseProficienciaDto): Promise<ClasseProficienciaResponseDto> {
    const classeProficiencia = await this.classeProficienciaRepository.findOne({
      where: { classeproficienciaid: id },
      relations: ['classe', 'proficiencia']
    });
    if (!classeProficiencia) {
      throw new ApiError(404, 'Relação classe-proficiência não encontrada');
    }

    if (updateClasseProficienciaDto.classeid) {
      const classe = await this.classeRepository.findOne({ where: { classeid: updateClasseProficienciaDto.classeid } });
      if (!classe) {
        throw new ApiError(404, 'Classe não encontrada');
      }
      classeProficiencia.classe = classe;
    }

    if (updateClasseProficienciaDto.proficienciaid) {
      const proficiencia = await this.proficienciaRepository.findOne({ where: { proficienciaid: updateClasseProficienciaDto.proficienciaid } });
      if (!proficiencia) {
        throw new ApiError(404, 'Proficiência não encontrada');
      }
      classeProficiencia.proficiencia = proficiencia;
    }

    if (updateClasseProficienciaDto.classeid && updateClasseProficienciaDto.proficienciaid) {
      const existingRelation = await this.classeProficienciaRepository.findOne({
        where: {
          classe: { classeid: updateClasseProficienciaDto.classeid },
          proficiencia: { proficienciaid: updateClasseProficienciaDto.proficienciaid }
        }
      });
      if (existingRelation && existingRelation.classeproficienciaid !== id) {
        throw new ApiError(400, 'Relação entre classe e proficiência já existe');
      }
    }

    const updatedClasseProficiencia = await this.classeProficienciaRepository.save(classeProficiencia);
    return this.mapToDto(updatedClasseProficiencia);
  }

  async deleteClasseProficiencia(id: string): Promise<void> {
    const result = await this.classeProficienciaRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Relação classe-proficiência não encontrada');
    }
  }

  private mapToDto(classeProficiencia: Classeproficienciat20): ClasseProficienciaResponseDto {
    return {
      classeproficienciaid: classeProficiencia.classeproficienciaid,
      classeid: classeProficiencia.classe.classeid,
      proficienciaid: classeProficiencia.proficiencia.proficienciaid
    };
  }
}