import { AppDataSource } from '../../config/database';
import { Classest20 } from '../../entities/Classest20';
import { CreateClasseDto, UpdateClasseDto, ClasseResponseDto } from '../../dtos/tabelas_base/classe.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class ClasseService {
    private classeRepository: Repository<Classest20>;

    constructor() {
        this.classeRepository = AppDataSource.getRepository(Classest20);
    }

    async createClasse(createClasseDto: CreateClasseDto): Promise<ClasseResponseDto> {
        const { classenome } = createClasseDto;

        const existingClasse = await this.classeRepository.findOne({ where: { classenome } });
        if (existingClasse) {
            throw new ApiError(400, 'Nome da classe já está em uso');
        }

        const newClasse = this.classeRepository.create(createClasseDto);

        const savedClasse = await this.classeRepository.save(newClasse);
        return {
            classeid: savedClasse.classeid,
            classenome: savedClasse.classenome,
            classedescricao: savedClasse.classedescricao,
            classepvinicial: savedClasse.classepvinicial,
            classepvnivel: savedClasse.classepvnivel,
            classepmnivel: savedClasse.classepmnivel,
            classenumpericias: savedClasse.classenumpericias,
        };
    }

    async getAllClasses(): Promise<ClasseResponseDto[]> {
        const classes = await this.classeRepository.find();
        return classes.map(classe => ({
            classeid: classe.classeid,
            classenome: classe.classenome,
            classedescricao: classe.classedescricao,
            classepvinicial: classe.classepvinicial,
            classepvnivel: classe.classepvnivel,
            classepmnivel: classe.classepmnivel,
            classenumpericias: classe.classenumpericias,
        }));
    }

    async getClasseById(id: string): Promise<ClasseResponseDto> {
        const classe = await this.classeRepository.findOne({ where: { classeid: id } });
        if (!classe) {
            throw new ApiError(404, 'Classe não encontrada');
        }
        return {
            classeid: classe.classeid,
            classenome: classe.classenome,
            classedescricao: classe.classedescricao,
            classepvinicial: classe.classepvinicial,
            classepvnivel: classe.classepvnivel,
            classepmnivel: classe.classepmnivel,
            classenumpericias: classe.classenumpericias,
        };
    }

    async updateClasse(id: string, updateClasseDto: UpdateClasseDto): Promise<ClasseResponseDto> {
        const classe = await this.classeRepository.findOne({ where: { classeid: id } });
        if (!classe) {
            throw new ApiError(404, 'Classe não encontrada');
        }

        if (updateClasseDto.classenome && updateClasseDto.classenome !== classe.classenome) {
            const existingClasse = await this.classeRepository.findOne({
                where: { classenome: updateClasseDto.classenome }
            });
            if (existingClasse) {
                throw new ApiError(400, 'Nome da classe já está em uso');
            }
        }

        await this.classeRepository.update(id, updateClasseDto);
        const updatedClasse = await this.classeRepository.findOne({ where: { classeid: id } });
        if (!updatedClasse) {
            throw new ApiError(404, 'Classe não encontrada após atualização');
        }
        return {
            classeid: updatedClasse.classeid,
            classenome: updatedClasse.classenome,
            classedescricao: updatedClasse.classedescricao,
            classepvinicial: updatedClasse.classepvinicial,
            classepvnivel: updatedClasse.classepvnivel,
            classepmnivel: updatedClasse.classepmnivel,
            classenumpericias: updatedClasse.classenumpericias,
        };
    }

    async deleteClasse(id: string): Promise<void> {
        const result = await this.classeRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Classe não encontrada');
        }
    }
}