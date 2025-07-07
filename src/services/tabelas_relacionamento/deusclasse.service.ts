import { AppDataSource } from '../../config/database';
import { Deusclasset20 } from '../../entities/Deusclasset20';
import { Classest20 } from '../../entities/Classest20';
import { Deusest20 } from '../../entities/Deusest20';
import { CreateDeusClasseDto, UpdateDeusClasseDto, DeusClasseResponseDto } from '../../dtos/tabelas_relacionamento/deusclasse.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class DeusClasseService {
  private deusClasseRepository: Repository<Deusclasset20>;
  private classeRepository: Repository<Classest20>;
  private deusRepository: Repository<Deusest20>;

  constructor() {
    this.deusClasseRepository = AppDataSource.getRepository(Deusclasset20);
    this.classeRepository = AppDataSource.getRepository(Classest20);
    this.deusRepository = AppDataSource.getRepository(Deusest20);
  }

  async createDeusClasse(createDeusClasseDto: CreateDeusClasseDto): Promise<DeusClasseResponseDto> {
    const { classeid, deusid } = createDeusClasseDto;

    const classe = await this.classeRepository.findOne({ where: { classeid } });
    if (!classe) {
      throw new ApiError(404, 'Classe não encontrada');
    }

    const deus = await this.deusRepository.findOne({ where: { deusid } });
    if (!deus) {
      throw new ApiError(404, 'Deus não encontrado');
    }

    const existingRelation = await this.deusClasseRepository.findOne({
      where: { classe: { classeid }, deus: { deusid } }
    });
    if (existingRelation) {
      throw new ApiError(400, 'Relação entre deus e classe já existe');
    }

    const newDeusClasse = this.deusClasseRepository.create({
      classe,
      deus
    });

    const savedDeusClasse = await this.deusClasseRepository.save(newDeusClasse);
    return this.mapToDto(savedDeusClasse);
  }

  async getAllDeusClasses(): Promise<DeusClasseResponseDto[]> {
    const deusClasses = await this.deusClasseRepository.find({ relations: ['classe', 'deus'] });
    return deusClasses.map(this.mapToDto);
  }

  async getDeusClasseById(id: string): Promise<DeusClasseResponseDto> {
    const deusClasse = await this.deusClasseRepository.findOne({
      where: { deusclasseid: id },
      relations: ['classe', 'deus']
    });
    if (!deusClasse) {
      throw new ApiError(404, 'Relação deus-classe não encontrada');
    }
    return this.mapToDto(deusClasse);
  }

  async updateDeusClasse(id: string, updateDeusClasseDto: UpdateDeusClasseDto): Promise<DeusClasseResponseDto> {
    const deusClasse = await this.deusClasseRepository.findOne({
      where: { deusclasseid: id },
      relations: ['classe', 'deus']
    });
    if (!deusClasse) {
      throw new ApiError(404, 'Relação deus-classe não encontrada');
    }

    if (updateDeusClasseDto.classeid) {
      const classe = await this.classeRepository.findOne({ where: { classeid: updateDeusClasseDto.classeid } });
      if (!classe) {
        throw new ApiError(404, 'Classe não encontrada');
      }
      deusClasse.classe = classe;
    }

    if (updateDeusClasseDto.deusid) {
      const deus = await this.deusRepository.findOne({ where: { deusid: updateDeusClasseDto.deusid } });
      if (!deus) {
        throw new ApiError(404, 'Deus não encontrado');
      }
      deusClasse.deus = deus;
    }

    if (updateDeusClasseDto.classeid && updateDeusClasseDto.deusid) {
      const existingRelation = await this.deusClasseRepository.findOne({
        where: {
          classe: { classeid: updateDeusClasseDto.classeid },
          deus: { deusid: updateDeusClasseDto.deusid }
        }
      });
      if (existingRelation && existingRelation.deusclasseid !== id) {
        throw new ApiError(400, 'Relação entre deus e classe já existe');
      }
    }

    const updatedDeusClasse = await this.deusClasseRepository.save(deusClasse);
    return this.mapToDto(updatedDeusClasse);
  }

  async deleteDeusClasse(id: string): Promise<void> {
    const result = await this.deusClasseRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Relação deus-classe não encontrada');
    }
  }

  private mapToDto(deusClasse: Deusclasset20): DeusClasseResponseDto {
    return {
      deusclasseid: deusClasse.deusclasseid,
      classeid: deusClasse.classe.classeid,
      deusid: deusClasse.deus.deusid
    };
  }
}