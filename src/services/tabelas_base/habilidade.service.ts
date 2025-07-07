import { AppDataSource } from '../../config/database';
import { Habilidadest20 } from '../../entities/Habilidadest20';
import { CreateHabilidadeDto, UpdateHabilidadeDto, HabilidadeResponseDto } from '../../dtos/tabelas_base/habilidade.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class HabilidadeService {
    private habilidadeRepository: Repository<Habilidadest20>;

    constructor() {
        this.habilidadeRepository = AppDataSource.getRepository(Habilidadest20);
    }

    async createHabilidade(createHabilidadeDto: CreateHabilidadeDto): Promise<HabilidadeResponseDto> {
        const { habilidadenome } = createHabilidadeDto;

        const existingHabilidade = await this.habilidadeRepository.findOne({ where: { habilidadenome } });
        if (existingHabilidade) {
            throw new ApiError(400, 'Nome da habilidade já está em uso');
        }

        const newHabilidade = this.habilidadeRepository.create(createHabilidadeDto);

        const savedHabilidade = await this.habilidadeRepository.save(newHabilidade);
        return {
            habilidadeid: savedHabilidade.habilidadeid,
            habilidadenome: savedHabilidade.habilidadenome,
            habilidadedescricao: savedHabilidade.habilidadedescricao,
            habilidadealcance: savedHabilidade.habilidadealcance,
            habilidadeduracao: savedHabilidade.habilidadeduracao,
            habilidadepmcusto: savedHabilidade.habilidadepmcusto,
            habilidadeexecucao: savedHabilidade.habilidadeexecucao,
            habilidaderesistencia: savedHabilidade.habilidaderesistencia,
            habilidadeefeito: savedHabilidade.habilidadeefeito,
        };
    }

    async getAllHabilidades(): Promise<HabilidadeResponseDto[]> {
        const habilidades = await this.habilidadeRepository.find();
        return habilidades.map(habilidade => ({
            habilidadeid: habilidade.habilidadeid,
            habilidadenome: habilidade.habilidadenome,
            habilidadedescricao: habilidade.habilidadedescricao,
            habilidadealcance: habilidade.habilidadealcance,
            habilidadeduracao: habilidade.habilidadeduracao,
            habilidadepmcusto: habilidade.habilidadepmcusto,
            habilidadeexecucao: habilidade.habilidadeexecucao,
            habilidaderesistencia: habilidade.habilidaderesistencia,
            habilidadeefeito: habilidade.habilidadeefeito,
        }));
    }

    async getHabilidadeById(id: string): Promise<HabilidadeResponseDto> {
        const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid: id } });
        if (!habilidade) {
            throw new ApiError(404, 'Habilidade não encontrada');
        }
        return {
            habilidadeid: habilidade.habilidadeid,
            habilidadenome: habilidade.habilidadenome,
            habilidadedescricao: habilidade.habilidadedescricao,
            habilidadealcance: habilidade.habilidadealcance,
            habilidadeduracao: habilidade.habilidadeduracao,
            habilidadepmcusto: habilidade.habilidadepmcusto,
            habilidadeexecucao: habilidade.habilidadeexecucao,
            habilidaderesistencia: habilidade.habilidaderesistencia,
            habilidadeefeito: habilidade.habilidadeefeito,
        };
    }

    async updateHabilidade(id: string, updateHabilidadeDto: UpdateHabilidadeDto): Promise<HabilidadeResponseDto> {
        const habilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid: id } });
        if (!habilidade) {
            throw new ApiError(404, 'Habilidade não encontrada');
        }

        if (updateHabilidadeDto.habilidadenome && updateHabilidadeDto.habilidadenome !== habilidade.habilidadenome) {
            const existingHabilidade = await this.habilidadeRepository.findOne({
                where: { habilidadenome: updateHabilidadeDto.habilidadenome }
            });
            if (existingHabilidade) {
                throw new ApiError(400, 'Nome da habilidade já está em uso');
            }
        }

        await this.habilidadeRepository.update(id, updateHabilidadeDto);
        const updatedHabilidade = await this.habilidadeRepository.findOne({ where: { habilidadeid: id } });
        if (!updatedHabilidade) {
            throw new ApiError(404, 'Habilidade não encontrada após atualização');
        }
        return {
            habilidadeid: updatedHabilidade.habilidadeid,
            habilidadenome: updatedHabilidade.habilidadenome,
            habilidadedescricao: updatedHabilidade.habilidadedescricao,
            habilidadealcance: updatedHabilidade.habilidadealcance,
            habilidadeduracao: updatedHabilidade.habilidadeduracao,
            habilidadepmcusto: updatedHabilidade.habilidadepmcusto,
            habilidadeexecucao: updatedHabilidade.habilidadeexecucao,
            habilidaderesistencia: updatedHabilidade.habilidaderesistencia,
            habilidadeefeito: updatedHabilidade.habilidadeefeito,
        };
    }

    async deleteHabilidade(id: string): Promise<void> {
        const result = await this.habilidadeRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Habilidade não encontrada');
        }
    }
}