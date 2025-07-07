import { AppDataSource } from '../../config/database';
import { Deusest20 } from '../../entities/Deusest20';
import { CreateDeusDto, UpdateDeusDto, DeusResponseDto } from '../../dtos/tabelas_base/deus.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class DeusService {
    private deusRepository: Repository<Deusest20>;

    constructor() {
        this.deusRepository = AppDataSource.getRepository(Deusest20);
    }

    async createDeus(createDeusDto: CreateDeusDto): Promise<DeusResponseDto> {
        const { deusnome } = createDeusDto;

        const existingDeus = await this.deusRepository.findOne({ where: { deusnome } });
        if (existingDeus) {
            throw new ApiError(400, 'Nome do deus já está em uso');
        }

        const newDeus = this.deusRepository.create(createDeusDto);

        const savedDeus = await this.deusRepository.save(newDeus);
        return {
            deusid: savedDeus.deusid,
            deusnome: savedDeus.deusnome,
            deussimbolo: savedDeus.deussimbolo,
            deusenergia: savedDeus.deusenergia,
            deusarma: savedDeus.deusarma,
            deusdescricao: savedDeus.deusdescricao,
            deusobjetivos: savedDeus.deusobjetivos,
            deusobrigacoes: savedDeus.deusobrigacoes,
        };
    }

    async getAllDeus(): Promise<DeusResponseDto[]> {
        const deuses = await this.deusRepository.find();
        return deuses.map(deus => ({
            deusid: deus.deusid,
            deusnome: deus.deusnome,
            deussimbolo: deus.deussimbolo,
            deusenergia: deus.deusenergia,
            deusarma: deus.deusarma,
            deusdescricao: deus.deusdescricao,
            deusobjetivos: deus.deusobjetivos,
            deusobrigacoes: deus.deusobrigacoes,
        }));
    }

    async getDeusById(id: string): Promise<DeusResponseDto> {
        const deus = await this.deusRepository.findOne({ where: { deusid: id } });
        if (!deus) {
            throw new ApiError(404, 'Deus não encontrado');
        }
        return {
            deusid: deus.deusid,
            deusnome: deus.deusnome,
            deussimbolo: deus.deussimbolo,
            deusenergia: deus.deusenergia,
            deusarma: deus.deusarma,
            deusdescricao: deus.deusdescricao,
            deusobjetivos: deus.deusobjetivos,
            deusobrigacoes: deus.deusobrigacoes,
        };
    }

    async updateDeus(id: string, updateDeusDto: UpdateDeusDto): Promise<DeusResponseDto> {
        const deus = await this.deusRepository.findOne({ where: { deusid: id } });
        if (!deus) {
            throw new ApiError(404, 'Deus não encontrado');
        }

        if (updateDeusDto.deusnome && updateDeusDto.deusnome !== deus.deusnome) {
            const existingDeus = await this.deusRepository.findOne({
                where: { deusnome: updateDeusDto.deusnome }
            });
            if (existingDeus) {
                throw new ApiError(400, 'Nome do deus já está em uso');
            }
        }

        await this.deusRepository.update(id, updateDeusDto);
        const updatedDeus = await this.deusRepository.findOne({ where: { deusid: id } });
        if (!updatedDeus) {
            throw new ApiError(404, 'Deus não encontrado após atualização');
        }
        return {
            deusid: updatedDeus.deusid,
            deusnome: updatedDeus.deusnome,
            deussimbolo: updatedDeus.deussimbolo,
            deusenergia: updatedDeus.deusenergia,
            deusarma: updatedDeus.deusarma,
            deusdescricao: updatedDeus.deusdescricao,
            deusobjetivos: updatedDeus.deusobjetivos,
            deusobrigacoes: updatedDeus.deusobrigacoes,
        };
    }

    async deleteDeus(id: string): Promise<void> {
        const result = await this.deusRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Deus não encontrado');
        }
    }
}