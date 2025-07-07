import { AppDataSource } from '../../config/database';
import { Personagenst20 } from '../../entities/Personagenst20';
import { Deusest20 } from '../../entities/Deusest20';
import { Origenst20 } from '../../entities/Origenst20';
import { Racast20 } from '../../entities/Racast20';
import { Tamanhost20 } from '../../entities/Tamanhost20';
import { Usuarios } from '../../entities/Usuarios';
import { CreatePersonagemDto, UpdatePersonagemDto, PersonagemResponseDto } from '../../dtos/tabelas_base/personagem.dto';
import { Repository } from 'typeorm';
import { ApiError } from '../../utils/apiError';

export class PersonagemService {
  private personagemRepository: Repository<Personagenst20>;
  private deusRepository: Repository<Deusest20>;
  private origemRepository: Repository<Origenst20>;
  private racaRepository: Repository<Racast20>;
  private tamanhoRepository: Repository<Tamanhost20>;
  private usuarioRepository: Repository<Usuarios>;

  constructor() {
    this.personagemRepository = AppDataSource.getRepository(Personagenst20);
    this.deusRepository = AppDataSource.getRepository(Deusest20);
    this.origemRepository = AppDataSource.getRepository(Origenst20);
    this.racaRepository = AppDataSource.getRepository(Racast20);
    this.tamanhoRepository = AppDataSource.getRepository(Tamanhost20);
    this.usuarioRepository = AppDataSource.getRepository(Usuarios);
  }

  async createPersonagem(createPersonagemDto: CreatePersonagemDto & { usuarioid: string }): Promise<PersonagemResponseDto> {
    const {
      deusid,
      origemid,
      racaid,
      tamanhoid,
      usuarioid,
      ...personagemData
    } = createPersonagemDto;

    // Verificar existência das entidades relacionadas
    let deus: Deusest20 | null = null;
    if (deusid) {
      deus = await this.deusRepository.findOne({ where: { deusid } });
      if (!deus) throw new ApiError(404, 'Deus não encontrado');
    }

    const origem = await this.origemRepository.findOne({ where: { origemid } });
    if (!origem) throw new ApiError(404, 'Origem não encontrada');

    const raca = await this.racaRepository.findOne({
      where: { racaid },
      relations: ['tamanho'], // Assumindo que Racast20 tem uma relação 'tamanho' com Tamanhost20
    });
    if (!raca) throw new ApiError(404, 'Raça não encontrada');

    let tamanho: Tamanhost20 | null = null;
    if (tamanhoid) {
      tamanho = await this.tamanhoRepository.findOne({ where: { tamanhoid } });
      if (!tamanho) throw new ApiError(404, 'Tamanho não encontrado');
    } else {
      // Usar o tamanho padrão da raça
      tamanho = raca.tamanho;
      if (!tamanho) throw new ApiError(404, 'Tamanho padrão da raça não encontrado');
    }

    const usuario = await this.usuarioRepository.findOne({ where: { usuarioid } });
    if (!usuario) throw new ApiError(404, 'Usuário não encontrado');

    const newPersonagem = this.personagemRepository.create({
      ...personagemData,
      deus: deus ?? undefined,
      origem,
      raca,
      tamanho,
      usuario
    });

    const savedPersonagem = await this.personagemRepository.save(newPersonagem);
    return this.mapToDto(savedPersonagem);
  }

  async getAllPersonagens(): Promise<PersonagemResponseDto[]> {
    const personagens = await this.personagemRepository.find({
      relations: ['deus', 'origem', 'raca', 'tamanho', 'usuario']
    });
    return personagens.map(this.mapToDto);
  }

  async getPersonagemById(id: string): Promise<PersonagemResponseDto> {
    const personagem = await this.personagemRepository.findOne({
      where: { personagemid: id },
      relations: ['deus', 'origem', 'raca', 'tamanho', 'usuario']
    });
    if (!personagem) {
      throw new ApiError(404, 'Personagem não encontrado');
    }
    return this.mapToDto(personagem);
  }

  async updatePersonagem(id: string, updatePersonagemDto: UpdatePersonagemDto): Promise<PersonagemResponseDto> {
    const personagem = await this.personagemRepository.findOne({
      where: { personagemid: id },
      relations: ['deus', 'origem', 'raca', 'tamanho', 'usuario']
    });
    if (!personagem) {
      throw new ApiError(404, 'Personagem não encontrado');
    }

    // Atualizar relacionamentos se fornecidos
    if (updatePersonagemDto.deusid !== undefined) {
      const deus = updatePersonagemDto.deusid
        ? await this.deusRepository.findOne({ where: { deusid: updatePersonagemDto.deusid } })
        : null;
      if (updatePersonagemDto.deusid && !deus) throw new ApiError(404, 'Deus não encontrado');
      personagem.deus = deus ?? undefined;
    }

    if (updatePersonagemDto.origemid) {
      const origem = await this.origemRepository.findOne({ where: { origemid: updatePersonagemDto.origemid } });
      if (!origem) throw new ApiError(404, 'Origem não encontrada');
      personagem.origem = origem;
    }

    if (updatePersonagemDto.racaid) {
      const raca = await this.racaRepository.findOne({
        where: { racaid: updatePersonagemDto.racaid },
        relations: ['tamanho']
      });
      if (!raca) throw new ApiError(404, 'Raça não encontrada');
      personagem.raca = raca;
      // Se tamanhoid não for fornecido, usar o tamanho padrão da nova raça
      if (!updatePersonagemDto.tamanhoid) {
        const tamanho = raca.tamanho;
        if (!tamanho) throw new ApiError(404, 'Tamanho padrão da raça não encontrado');
        personagem.tamanho = tamanho;
      }
    }

    if (updatePersonagemDto.tamanhoid) {
      const tamanho = await this.tamanhoRepository.findOne({ where: { tamanhoid: updatePersonagemDto.tamanhoid } });
      if (!tamanho) throw new ApiError(404, 'Tamanho não encontrado');
      personagem.tamanho = tamanho;
    }

    // Atualizar campos simples
    Object.assign(personagem, updatePersonagemDto);

    const updatedPersonagem = await this.personagemRepository.save(personagem);
    return this.mapToDto(updatedPersonagem);
  }

  async deletePersonagem(id: string): Promise<void> {
    const result = await this.personagemRepository.delete(id);
    if (result.affected === 0) {
      throw new ApiError(404, 'Personagem não encontrado');
    }
  }

  private mapToDto(personagem: Personagenst20): PersonagemResponseDto {
    return {
      personagemid: personagem.personagemid,
      personagemnome: personagem.personagemnome,
      personagemdefesa: personagem.personagemdefesa,
      personagemcdmagia: personagem.personagemcdmagia,
      personagemdeslocamento: personagem.personagemdeslocamento,
      personagemcarga: personagem.personagemcarga,
      personagemcargaespaco: personagem.personagemcargaespaco,
      personagempv: personagem.personagempv,
      personagempvtotal: personagem.personagempvtotal,
      personagempm: personagem.personagempm,
      personagempmtotal: personagem.personagempmtotal,
      personagemexperiencia: personagem.personagemexperiencia,
      personagemtibar: personagem.personagemtibar,
      deusid: personagem.deus?.deusid,
      origemid: personagem.origem?.origemid,
      racaid: personagem.raca?.racaid,
      tamanhoid: personagem.tamanho?.tamanhoid,
      usuarioid: personagem.usuario?.usuarioid
    };
  }
}