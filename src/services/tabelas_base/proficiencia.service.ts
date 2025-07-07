import { AppDataSource } from '../../config/database';
import { Proficienciast20 } from '../../entities/Proficienciast20';
import { CreateProficienciaDto, UpdateProficienciaDto, ProficienciaResponseDto } from '../../dtos/tabelas_base/proficiencia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class ProficienciaService {
    private proficienciaRepository: Repository<Proficienciast20>;

    constructor() {
        this.proficienciaRepository = AppDataSource.getRepository(Proficienciast20);
    }

    async createProficiencia(createProficienciaDto: CreateProficienciaDto): Promise<ProficienciaResponseDto> {
        const { proficiencianome } = createProficienciaDto;

        const existingProficiencia = await this.proficienciaRepository.findOne({ where: { proficiencianome } });
        if (existingProficiencia) {
            throw new ApiError(400, 'Nome da proficiência já está em uso');
        }

        const newProficiencia = this.proficienciaRepository.create(createProficienciaDto);

        const savedProficiencia = await this.proficienciaRepository.save(newProficiencia);
        return {
            proficienciaid: savedProficiencia.proficienciaid,
            proficiencianome: savedProficiencia.proficiencianome,
        };
    }

    async getAllProficiencia(): Promise<ProficienciaResponseDto[]> {
        const proficiencias = await this.proficienciaRepository.find();
        return proficiencias.map(proficiencia => ({
            proficienciaid: proficiencia.proficienciaid,
            proficiencianome: proficiencia.proficiencianome,
        }));
    }

    async getProficienciaById(id: string): Promise<ProficienciaResponseDto> {
        const proficiencia = await this.proficienciaRepository.findOne({ where: { proficienciaid: id } });
        if (!proficiencia) {
            throw new ApiError(404, 'Proficiência não encontrada');
        }
        return {
            proficienciaid: proficiencia.proficienciaid,
            proficiencianome: proficiencia.proficiencianome,
        };
    }

    async updateProficiencia(id: string, updateProficienciaDto: UpdateProficienciaDto): Promise<ProficienciaResponseDto> {
        const proficiencia = await this.proficienciaRepository.findOne({ where: { proficienciaid: id } });
        if (!proficiencia) {
            throw new ApiError(404, 'Proficiência não encontrada');
        }

        if (updateProficienciaDto.proficiencianome && updateProficienciaDto.proficiencianome !== proficiencia.proficiencianome) {
            const existingProficiencia = await this.proficienciaRepository.findOne({
                where: { proficiencianome: updateProficienciaDto.proficiencianome }
            });
            if (existingProficiencia) {
                throw new ApiError(400, 'Nome da proficiência já está em uso');
            }
        }

        await this.proficienciaRepository.update(id, updateProficienciaDto);
        const updatedProficiencia = await this.proficienciaRepository.findOne({ where: { proficienciaid: id } });
        if (!updatedProficiencia) {
            throw new ApiError(404, 'Proficiência não encontrada após atualização');
        }
        return {
            proficienciaid: updatedProficiencia.proficienciaid,
            proficiencianome: updatedProficiencia.proficiencianome,
        };
    }

    async deleteProficiencia(id: string): Promise<void> {
        const result = await this.proficienciaRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Proficiência não encontrada');
        }
    }
}