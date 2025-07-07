import { AppDataSource } from '../../config/database';
import { Tamanhost20 } from '../../entities/Tamanhost20';
import { CreateTamanhoDto, UpdateTamanhoDto, TamanhoResponseDto } from '../../dtos/tabelas_base/tamanho.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class TamanhoService {
    private tamanhoRepository: Repository<Tamanhost20>;

    constructor() {
        this.tamanhoRepository = AppDataSource.getRepository(Tamanhost20);
    }

    async createTamanho(createTamanhoDto: CreateTamanhoDto): Promise<TamanhoResponseDto> {
        const newTamanho = this.tamanhoRepository.create(createTamanhoDto);
        const savedTamanho = await this.tamanhoRepository.save(newTamanho);
        return this.mapToDto(savedTamanho);
    }

    async getAllTamanhos(): Promise<TamanhoResponseDto[]> {
        const tamanhos = await this.tamanhoRepository.find();
        return tamanhos.map(this.mapToDto);
    }

    async getTamanhoById(id: string): Promise<TamanhoResponseDto> {
        const tamanho = await this.tamanhoRepository.findOne({ where: { tamanhoid: id } });
        if (!tamanho) {
            throw new ApiError(404, 'Tamanho não encontrado');
        }
        return this.mapToDto(tamanho);
    }

    async updateTamanho(id: string, updateTamanhoDto: UpdateTamanhoDto): Promise<TamanhoResponseDto> {
        await this.tamanhoRepository.update(id, updateTamanhoDto);
        const updatedTamanho = await this.tamanhoRepository.findOne({ where: { tamanhoid: id } });
        if (!updatedTamanho) {
            throw new ApiError(404, 'Tamanho não encontrado após atualização');
        }
        return this.mapToDto(updatedTamanho);
    }

    async deleteTamanho(id: string): Promise<void> {
        const result = await this.tamanhoRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Tamanho não encontrado');
        }
    }

    private mapToDto(tamanho: Tamanhost20): TamanhoResponseDto {
        return {
            tamanhoid: tamanho.tamanhoid,
            tamanhocategoria: tamanho.tamanhocategoria,
            tamanhoalcanceespaco: tamanho.tamanhoalcanceespaco,
            tamanhofurtividade: tamanho.tamanhofurtividade,
            tamanhomanobra: tamanho.tamanhomanobra,
            tamanhonumero: tamanho.tamanhonumero
        };
    }
}