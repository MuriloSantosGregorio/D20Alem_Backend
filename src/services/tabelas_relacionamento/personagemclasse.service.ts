import { AppDataSource } from '../../config/database';
import { Personagemclasset20 } from '../../entities/Personagemclasset20';
import { Classest20 } from '../../entities/Classest20';
import { Personagenst20 } from '../../entities/Personagenst20';
import { CreatePersonagemClasseDto, UpdatePersonagemClasseDto, PersonagemClasseResponseDto } from '../../dtos/tabelas_relacionamento/personagemclasse.dto';
import { PersonagemService } from '../tabelas_base/personagem.service';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';
import { UpdatePersonagemDto } from '../../dtos/tabelas_base/personagem.dto';

export class PersonagemClasseService {
  private personagemClasseRepository: Repository<Personagemclasset20>;
  private classeRepository: Repository<Classest20>;
  private personagemRepository: Repository<Personagenst20>;
  private personagemService: PersonagemService;

  constructor() {
    this.personagemClasseRepository = AppDataSource.getRepository(Personagemclasset20);
    this.classeRepository = AppDataSource.getRepository(Classest20);
    this.personagemRepository = AppDataSource.getRepository(Personagenst20);
    this.personagemService = new PersonagemService();
  }

  async createPersonagemClasse(createDto: CreatePersonagemClasseDto): Promise<PersonagemClasseResponseDto> {
    const { classeid, personagemid, personagemclasse } = createDto;

    // Verify related entities
    const classe = await this.classeRepository.findOne({ where: { classeid } });
    if (!classe) throw new ApiError(404, 'Classe não encontrada');

    const personagem = await this.personagemRepository.findOne({ where: { personagemid } });
    if (!personagem) throw new ApiError(404, 'Personagem não encontrado');

    // Check for existing personagem-classe combination
    const existing = await this.personagemClasseRepository.findOne({
      where: { classe: { classeid }, personagem: { personagemid } },
    });
    if (existing) throw new ApiError(400, 'Esta classe já está associada a este personagem');

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
      const newPersonagemClasse = this.personagemClasseRepository.create({
        personagemclasse,
        classe,
        personagem,
      });

      const saved = await transactionalEntityManager.save(newPersonagemClasse);

      // Update personagem's PV and PM when creating with personagemclasse = 1
      if (personagemclasse === 1) {
        const updatePersonagemDto: UpdatePersonagemDto = {
          personagempvtotal: (personagem.personagempvtotal || 0) + (classe.classepvinicial || 0),
          personagempv: (personagem.personagempvtotal || 0) + (classe.classepvinicial || 0),
          personagempmtotal: classe.classepmnivel || 0, // Set PM total to classepmnivel
          personagempm: classe.classepmnivel || 0, // Set PM to classepmnivel
        };
        console.log(`[createPersonagemClasse] Updating personagem ${personagemid} with PV: ${updatePersonagemDto.personagempvtotal}, PM: ${updatePersonagemDto.personagempmtotal}`);
        await this.personagemService.updatePersonagem(personagemid, updatePersonagemDto);
      }

      return this.mapToDto(saved);
    });
  }

  async getAllPersonagemClasses(): Promise<PersonagemClasseResponseDto[]> {
    const personagemClasses = await this.personagemClasseRepository.find({
      relations: ['classe', 'personagem'],
    });
    return personagemClasses.map(this.mapToDto);
  }

  async getPersonagemClasseById(id: string): Promise<PersonagemClasseResponseDto> {
    const personagemClasse = await this.personagemClasseRepository.findOne({
      where: { personagemclasseid: id },
      relations: ['classe', 'personagem'],
    });
    if (!personagemClasse) throw new ApiError(404, 'Personagem-classe não encontrado');
    return this.mapToDto(personagemClasse);
  }

  async getPersonagemClasseByPersonagemAndClasse(personagemid: string, classeid: string): Promise<PersonagemClasseResponseDto | null> {
    const personagemClasse = await this.personagemClasseRepository.findOne({
      where: {
        personagem: { personagemid },
        classe: { classeid },
      },
      relations: ['classe', 'personagem'],
    });
    return personagemClasse ? this.mapToDto(personagemClasse) : null;
  }

  async updatePersonagemClasse(id: string, updateDto: UpdatePersonagemClasseDto): Promise<PersonagemClasseResponseDto> {
    const personagemClasse = await this.personagemClasseRepository.findOne({
      where: { personagemclasseid: id },
      relations: ['classe', 'personagem'],
    });
    if (!personagemClasse) throw new ApiError(404, 'Personagem-classe não encontrado');

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
      // Update related entities if provided
      if (updateDto.classeid) {
        const classe = await this.classeRepository.findOne({ where: { classeid: updateDto.classeid } });
        if (!classe) throw new ApiError(404, 'Classe não encontrada');
        personagemClasse.classe = classe;
      }

      if (updateDto.personagemid) {
        const personagem = await this.personagemRepository.findOne({ where: { personagemid: updateDto.personagemid } });
        if (!personagem) throw new ApiError(404, 'Personagem não encontrado');
        personagemClasse.personagem = personagem;
      }

      // Check for duplicate combination if changing classe or personagem
      if (updateDto.classeid || updateDto.personagemid) {
        const existing = await this.personagemClasseRepository.findOne({
          where: {
            classe: { classeid: updateDto.classeid || personagemClasse.classe.classeid },
            personagem: { personagemid: updateDto.personagemid || personagemClasse.personagem.personagemid },
          },
        });
        if (existing && existing.personagemclasseid !== id) {
          throw new ApiError(400, 'Esta classe já está associada a este personagem');
        }
      }

      // Update simple fields
      if (updateDto.personagemclasse !== undefined) {
        personagemClasse.personagemclasse = updateDto.personagemclasse;
      }

      const updated = await transactionalEntityManager.save(personagemClasse);
      return this.mapToDto(updated);
    });
  }

  async deletePersonagemClasse(id: string): Promise<void> {
    const result = await this.personagemClasseRepository.delete(id);
    if (result.affected === 0) throw new ApiError(404, 'Personagem-classe não encontrado');
  }

  async levelUp(personagemid: string, classeid: string): Promise<{ personagemClasse: PersonagemClasseResponseDto; isNew: boolean }> {
    const existing = await this.getPersonagemClasseByPersonagemAndClasse(personagemid, classeid);
    const personagem = await this.personagemRepository.findOne({ where: { personagemid } });
    if (!personagem) throw new ApiError(404, 'Personagem não encontrado');

    const classe = await this.classeRepository.findOne({ where: { classeid } });
    if (!classe) throw new ApiError(404, 'Classe não encontrada');

    return await AppDataSource.transaction(async (transactionalEntityManager) => {
      if (existing) {
        // Increment level and update PV and PM with classepvnivel and classepmnivel
        const updateDto: UpdatePersonagemClasseDto = {
          personagemclasse: existing.personagemclasse + 1,
        };
        const updatedPersonagemClasse = await this.updatePersonagemClasse(existing.personagemclasseid, updateDto);

        const updatePersonagemDto: UpdatePersonagemDto = {
          personagempvtotal: (personagem.personagempvtotal || 0) + (classe.classepvnivel || 0),
          personagempv: (personagem.personagempvtotal || 0) + (classe.classepvnivel || 0),
          personagempmtotal: (personagem.personagempmtotal || 0) + (classe.classepmnivel || 0), // Add classepmnivel to PM total
          personagempm: (personagem.personagempmtotal || 0) + (classe.classepmnivel || 0), // Update PM to match PM total
        };
        console.log(`[levelUp] Updating personagem ${personagemid} with PV: ${updatePersonagemDto.personagempvtotal}, PM: ${updatePersonagemDto.personagempmtotal}`);
        await this.personagemService.updatePersonagem(personagemid, updatePersonagemDto);

        return { personagemClasse: updatedPersonagemClasse, isNew: false };
      } else {
        // Create new record with level 1 and update PV and PM in createPersonagemClasse
        const createDto: CreatePersonagemClasseDto = {
          personagemclasse: 1,
          classeid,
          personagemid,
        };
        const newPersonagemClasse = await this.createPersonagemClasse(createDto);
        return { personagemClasse: newPersonagemClasse, isNew: true };
      }
    });
  }

  private mapToDto(personagemClasse: Personagemclasset20): PersonagemClasseResponseDto {
    return {
      personagemclasseid: personagemClasse.personagemclasseid,
      personagemclasse: personagemClasse.personagemclasse,
      classeid: personagemClasse.classe.classeid,
      personagemid: personagemClasse.personagem.personagemid,
    };
  }
}