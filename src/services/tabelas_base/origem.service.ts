import { AppDataSource } from '../../config/database';
import { Origenst20 } from '../../entities/Origenst20';
import { CreateOrigemDto, UpdateOrigemDto, OrigemResponseDto } from '../../dtos/tabelas_base/origem.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class OrigemService {
  private origemRepository: Repository<Origenst20>;

  constructor() {
    this.origemRepository = AppDataSource.getRepository(Origenst20);
  }

  async createOrigem(createOrigemDto: CreateOrigemDto): Promise<OrigemResponseDto> {
    const existingOrigem = await this.origemRepository.findOne({ 
      where: { origemnome: createOrigemDto.origemnome } 
    });
    
    if (existingOrigem) {
      throw new ApiError(400, 'Nome da origem já está em uso');
    }

    const newOrigem = this.origemRepository.create(createOrigemDto);
    const savedOrigem = await this.origemRepository.save(newOrigem);
    
    return {
      origemid: savedOrigem.origemid,
      origemnome: savedOrigem.origemnome,
      origemdescricao: savedOrigem.origemdescricao
    };
  }

  async getAllOrigens(): Promise<OrigemResponseDto[]> {
    const origens = await this.origemRepository.find();
    return origens.map(origem => ({
      origemid: origem.origemid,
      origemnome: origem.origemnome,
      origemdescricao: origem.origemdescricao
    }));
  }

  async getOrigemById(id: string): Promise<OrigemResponseDto> {
    const origem = await this.origemRepository.findOne({ where: { origemid: id } });
    
    if (!origem) {
      throw new ApiError(404, 'Origem não encontrada');
    }
    
    return {
      origemid: origem.origemid,
      origemnome: origem.origemnome,
      origemdescricao: origem.origemdescricao
    };
  }

  async updateOrigem(id: string, updateOrigemDto: UpdateOrigemDto): Promise<OrigemResponseDto> {
    const origem = await this.origemRepository.findOne({ where: { origemid: id } });
    
    if (!origem) {
      throw new ApiError(404, 'Origem não encontrada');
    }

    if (updateOrigemDto.origemnome && updateOrigemDto.origemnome !== origem.origemnome) {
      const existingOrigem = await this.origemRepository.findOne({ 
        where: { origemnome: updateOrigemDto.origemnome }
      });
      
      if (existingOrigem) {
        throw new ApiError(400, 'Nome da origem já está em uso');
      }
    }

    Object.assign(origem, updateOrigemDto);
    const updatedOrigem = await this.origemRepository.save(origem);
    
    return {
      origemid: updatedOrigem.origemid,
      origemnome: updatedOrigem.origemnome,
      origemdescricao: updatedOrigem.origemdescricao
    };
  }

  async deleteOrigem(id: string): Promise<void> {
    const result = await this.origemRepository.delete(id);
    
    if (result.affected === 0) {
      throw new ApiError(404, 'Origem não encontrada');
    }
  }
}