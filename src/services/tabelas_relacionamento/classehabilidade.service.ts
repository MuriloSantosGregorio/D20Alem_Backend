import { AppDataSource } from '../../config/database';
import { Classehabilidadet20 } from '../../entities/Classehabilidadet20';
import { Classest20 } from '../../entities/Classest20';
import { Habilidadest20 } from '../../entities/Habilidadest20';
import { CreateClasseHabilidadeDto, UpdateClasseHabilidadeDto, ClasseHabilidadeResponseDto } from '../../dtos/tabelas_relacionamento/classehabilidade.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class ClasseHabilidadeService {
  private classeHabilidadeRepository: Repository<Classehabilidadet20>;
  private classeRepository: Repository<Classest20>;
  private habilidadeRepository: Repository<Habilidadest20>;

  constructor() {
    this.classeHabilidadeRepository = AppDataSource.getRepository(Classehabilidadet20);
    this.classeRepository = AppDataSource.getRepository(Classest20);
    this.habilidadeRepository = AppDataSource.getRepository(Habilidadest20);
  }

  async createClasseHabilidade(createClasseHabilidadeDto: CreateClasseHabilidadeDto): Promise<ClasseHabilidadeResponseDto> {
    const { classeid, habilidadeid } = createClasseHabilidadeDto;

    const classe = await this.classeRepository.findOne({ where: { classeid } });
    if (!classe) {
      throw new ApiError(404, 'Classe não encontrada');
    }

    const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid } });
    if (!habilidade) {
      throw new ApiError(404, 'Habilidade não encontrada');
    }

    const existingRelation = await this.classeHabilidadeRepository.findOne({
      where: { classe: { classeid }, habilidade: { habilidadeid } }
    });
    if (existingRelation) {
      throw new ApiError(400, 'Relação entre classe e habilidade já existe');
    }

    const newClasseHabilidade = this.classeHabilidadeRepository.create({
      ...createClasseHabilidadeDto,
      classe,
      habilidade
    });

    const savedClasseHabilidade = await this.classeHabilidadeRepository.save(newClasseHabilidade);
    return this.mapToDto(savedClasseHabilidade);
  }

  async getAllClasseHabilidades(): Promise<ClasseHabilidadeResponseDto[]> {
    const classeHabilidades = await this.classeHabilidadeRepository.find({ relations: ['classe', 'habilidade'] });
    return classeHabilidades.map(this.mapToDto);
  }

  async getClasseHabilidadeById(id: string): Promise<ClasseHabilidadeResponseDto> {
    const classeHabilidade = await this.classeHabilidadeRepository.findOne({
      where: { classehabilidadeid: id },
      relations: ['classe', 'habilidade']
    });
    if (!classeHabilidade) {
      throw new ApiError(404, 'Relação classe-habilidade não encontrada');
    }
    return this.mapToDto(classeHabilidade);
  }

  async updateClasseHabilidade(id: string, updateClasseHabilidadeDto: UpdateClasseHabilidadeDto): Promise<ClasseHabilidadeResponseDto> {
    const classeHabilidade = await this.classeHabilidadeRepository.findOne({
      where: { classehabilidadeid: id },
      relations: ['classe', 'habilidade']
    });
    if (!classeHabilidade) {
      throw new ApiError(404, 'Relação classe-habilidade não encontrada');
    }

    if (updateClasseHabilidadeDto.classeid) {
      const classe = await this.classeRepository.findOne({ where: { classeid: updateClasseHabilidadeDto.classeid } });
      if (!classe) {
        throw new ApiError(404, 'Classe não encontrada');
      }
      classeHabilidade.classe = classe;
    }

    if (updateClasseHabilidadeDto.habilidadeid) {
      const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid: updateClasseHabilidadeDto.habilidadeid } });
      if (!habilidade) {
        throw new ApiError(404, 'Habilidade não encontrada');
      }
      classeHabilidade.habilidade = habilidade;
    }

    if (updateClasseHabilidadeDto.classeid && updateClasseHabilidadeDto.habilidadeid) {
      const existingRelation = await this.classeHabilidadeRepository.findOne({
        where: {
          classe: { classeid: updateClasseHabilidadeDto.classeid },
          habilidade: { habilidadeid: updateClasseHabilidadeDto.habilidadeid }
        }
      });
      if (existingRelation && existingRelation.classehabilidadeid !== id) {
        throw new ApiError(400, 'Relação entre classe e habilidade já existe');
      }
    }

    Object.assign(classeHabilidade, updateClasseHabilidadeDto);
    const updatedClasseHabilidade = await this.classeHabilidadeRepository.save(classeHabilidade);
    return this.mapToDto(updatedClasseHabilidade);
  }

  async deleteClasseHabilidade(id: string): Promise<void> {
    const result = await this.classeHabilidadeRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Relação classe-habilidade não encontrada');
    }
  }

  private mapToDto(classeHabilidade: Classehabilidadet20): ClasseHabilidadeResponseDto {
    return {
      classehabilidadeid: classeHabilidade.classehabilidadeid,
      classeid: classeHabilidade.classe.classeid,
      habilidadeid: classeHabilidade.habilidade.habilidadeid,
      classehabilidadenivel: classeHabilidade.classehabilidadenivel
    };
  }
}