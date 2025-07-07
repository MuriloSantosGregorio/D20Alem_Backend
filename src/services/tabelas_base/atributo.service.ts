import { AppDataSource } from '../../config/database';
import { Atributot20 } from '../../entities/Atributost20';
import { CreateAtributoDto, UpdateAtributoDto, AtributoResponseDto } from '../../dtos/tabelas_base/atributo.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class AtributoService {
    private atributoRepository: Repository<Atributot20>;

    constructor() {
        this.atributoRepository = AppDataSource.getRepository(Atributot20);
    }

    async createAtributo(createAtributoDto: CreateAtributoDto): Promise<AtributoResponseDto> {
        const { atributonome } = createAtributoDto;

        const existingAtributo = await this.atributoRepository.findOne({ where: { atributonome } });
        if (existingAtributo) {
            throw new ApiError(400, 'Nome do atributo já está em uso');
        }

        const newAtributo = this.atributoRepository.create({
            ...createAtributoDto,
        });

        const savedAtributo = await this.atributoRepository.save(newAtributo);
        return {
            atributoid: savedAtributo.atributoid,
            atributonome: savedAtributo.atributonome,
            atributotipo: savedAtributo.atributotipo,
            atributodescricao: savedAtributo.atributodescricao,
        };
    }

    async getAllAtributos(): Promise<AtributoResponseDto[]> {
        const atributos = await this.atributoRepository.find();
        return atributos.map(atributo => ({
            atributoid: atributo.atributoid,
            atributonome: atributo.atributonome,
            atributotipo: atributo.atributotipo,
            atributodescricao: atributo.atributodescricao,
        }));
    }

    async getAtributoById(id: string): Promise<AtributoResponseDto> {
        const atributo = await this.atributoRepository.findOne({ where: { atributoid: id } });
        if (!atributo) {
            throw new ApiError(404, 'Atributo não encontrado');
        }
        return {
            atributoid: atributo.atributoid,
            atributonome: atributo.atributonome,
            atributotipo: atributo.atributotipo,
            atributodescricao: atributo.atributodescricao,
        };
    }

    async updateAtributo(id: string, updateAtributoDto: UpdateAtributoDto): Promise<AtributoResponseDto> {
        const atributo = await this.atributoRepository.findOne({ where: { atributoid: id } });
        if (!atributo) {
            throw new ApiError(404, 'Atributo não encontrado');
        }

        if (updateAtributoDto.atributonome && updateAtributoDto.atributonome !== atributo.atributonome) {
            const existingAtributo = await this.atributoRepository.findOne({
                where: { atributonome: updateAtributoDto.atributonome }
            });
            if (existingAtributo) {
                throw new ApiError(400, 'Nome do atributo já está em uso');
            }
        }

        await this.atributoRepository.update(id, updateAtributoDto);
        const updatedAtributo = await this.atributoRepository.findOne({ where: { atributoid: id } });
        if (!updatedAtributo) {
            throw new ApiError(404, 'Atributo não encontrado após atualização');
        }
        return {
            atributoid: updatedAtributo.atributoid,
            atributonome: updatedAtributo.atributonome,
            atributotipo: updatedAtributo.atributotipo,
            atributodescricao: updatedAtributo.atributodescricao,
        };
    }

    async deleteAtributo(id: string): Promise<void> {
        const result = await this.atributoRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Atributo não encontrado');
        }
    }
}