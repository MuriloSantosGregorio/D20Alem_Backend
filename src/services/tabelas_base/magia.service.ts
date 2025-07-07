import { AppDataSource } from '../../config/database';
import { Magiast20 } from '../../entities/Magiast20';
import { CreateMagiaDto, UpdateMagiaDto, MagiaResponseDto } from '../../dtos/tabelas_base/magia.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class MagiaService {
    private magiaRepository: Repository<Magiast20>;

    constructor() {
        this.magiaRepository = AppDataSource.getRepository(Magiast20);
    }

    async createMagia(createMagiaDto: CreateMagiaDto): Promise<MagiaResponseDto> {
        const { magianome } = createMagiaDto;

        const existingMagia = await this.magiaRepository.findOne({ where: { magianome } });
        if (existingMagia) {
            throw new ApiError(400, 'Nome da magia já está em uso');
        }

        const newMagia = this.magiaRepository.create(createMagiaDto);

        const savedMagia = await this.magiaRepository.save(newMagia);
        return {
            magiaid: savedMagia.magiaid,
            magianome: savedMagia.magianome,
            magiaescola: savedMagia.magiaescola,
            magiacirculo: savedMagia.magiacirculo,
            magiatipo: savedMagia.magiatipo,
            magiaexecucao: savedMagia.magiaexecucao,
            magiaalcance: savedMagia.magiaalcance,
            magiaalvo: savedMagia.magiaalvo,
            magiaarea: savedMagia.magiaarea,
            magiaefeito: savedMagia.magiaefeito,
            magiaduracao: savedMagia.magiaduracao,
            magiaresistencia: savedMagia.magiaresistencia,
            magiadescricao: savedMagia.magiadescricao,
            magiacomponente: savedMagia.magiacomponente,
        };
    }

    async getAllMagia(): Promise<MagiaResponseDto[]> {
        const magias = await this.magiaRepository.find();
        return magias.map(magia => ({
            magiaid: magia.magiaid,
            magianome: magia.magianome,
            magiaescola: magia.magiaescola,
            magiacirculo: magia.magiacirculo,
            magiatipo: magia.magiatipo,
            magiaexecucao: magia.magiaexecucao,
            magiaalcance: magia.magiaalcance,
            magiaalvo: magia.magiaalvo,
            magiaarea: magia.magiaarea,
            magiaefeito: magia.magiaefeito,
            magiaduracao: magia.magiaduracao,
            magiaresistencia: magia.magiaresistencia,
            magiadescricao: magia.magiadescricao,
            magiacomponente: magia.magiacomponente,
        }));
    }

    async getMagiaById(id: string): Promise<MagiaResponseDto> {
        const magia = await this.magiaRepository.findOne({ where: { magiaid: id } });
        if (!magia) {
            throw new ApiError(404, 'Magia não encontrada');
        }
        return {
            magiaid: magia.magiaid,
            magianome: magia.magianome,
            magiaescola: magia.magiaescola,
            magiacirculo: magia.magiacirculo,
            magiatipo: magia.magiatipo,
            magiaexecucao: magia.magiaexecucao,
            magiaalcance: magia.magiaalcance,
            magiaalvo: magia.magiaalvo,
            magiaarea: magia.magiaarea,
            magiaefeito: magia.magiaefeito,
            magiaduracao: magia.magiaduracao,
            magiaresistencia: magia.magiaresistencia,
            magiadescricao: magia.magiadescricao,
            magiacomponente: magia.magiacomponente,
        };
    }

    async updateMagia(id: string, updateMagiaDto: UpdateMagiaDto): Promise<MagiaResponseDto> {
        const magia = await this.magiaRepository.findOne({ where: { magiaid: id } });
        if (!magia) {
            throw new ApiError(404, 'Magia não encontrada');
        }

        if (updateMagiaDto.magianome && updateMagiaDto.magianome !== magia.magianome) {
            const existingMagia = await this.magiaRepository.findOne({
                where: { magianome: updateMagiaDto.magianome }
            });
            if (existingMagia) {
                throw new ApiError(400, 'Nome da magia já está em uso');
            }
        }

        await this.magiaRepository.update(id, updateMagiaDto);
        const updatedMagia = await this.magiaRepository.findOne({ where: { magiaid: id } });
        if (!updatedMagia) {
            throw new ApiError(404, 'Magia não encontrada após atualização');
        }
        return {
            magiaid: updatedMagia.magiaid,
            magianome: updatedMagia.magianome,
            magiaescola: updatedMagia.magiaescola,
            magiacirculo: updatedMagia.magiacirculo,
            magiatipo: updatedMagia.magiatipo,
            magiaexecucao: updatedMagia.magiaexecucao,
            magiaalcance: updatedMagia.magiaalcance,
            magiaalvo: updatedMagia.magiaalvo,
            magiaarea: updatedMagia.magiaarea,
            magiaefeito: updatedMagia.magiaefeito,
            magiaduracao: updatedMagia.magiaduracao,
            magiaresistencia: updatedMagia.magiaresistencia,
            magiadescricao: updatedMagia.magiadescricao,
            magiacomponente: updatedMagia.magiacomponente,
        };
    }

    async deleteMagia(id: string): Promise<void> {
        const result = await this.magiaRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Magia não encontrada');
        }
    }
}