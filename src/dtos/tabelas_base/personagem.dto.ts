import { IsNotEmpty, IsUUID, IsString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonagemDto {
  @ApiProperty({ example: 'Frodo Bolseiro', description: 'Nome do personagem' })
  @IsNotEmpty()
  @IsString()
  personagemnome!: string;

  @ApiProperty({ example: 10, description: 'Defesa do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemdefesa?: number;

  @ApiProperty({ example: 5, description: 'CD de magia do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcdmagia?: number;

  @ApiProperty({ example: 9, description: 'Deslocamento do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemdeslocamento?: number;

  @ApiProperty({ example: 50, description: 'Carga do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcarga?: number;

  @ApiProperty({ example: 10, description: 'Espaço de carga do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcargaespaco?: number;

  @ApiProperty({ example: 20, description: 'PV atual do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempv?: number;

  @ApiProperty({ example: 20, description: 'PV total do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempvtotal?: number;

  @ApiProperty({ example: 10, description: 'PM atual do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempm?: number;

  @ApiProperty({ example: 10, description: 'PM total do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempmtotal?: number;

  @ApiProperty({ example: 0, description: 'Experiência do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemexperiencia?: number;

  @ApiProperty({ example: 0, description: 'Tibar do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemtibar?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do deus associado', required: false })
  @IsOptional()
  @IsUUID()
  deusid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da origem associada' })
  @IsNotEmpty()
  @IsUUID()
  origemid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada' })
  @IsNotEmpty()
  @IsUUID()
  racaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do tamanho associado', required: false })
  @IsOptional()
  @IsUUID()
  tamanhoid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do usuário associado' })
  @IsNotEmpty()
  @IsUUID()
  usuarioid!: string;
}

export class UpdatePersonagemDto {
  @ApiProperty({ example: 'Frodo Bolseiro', description: 'Nome do personagem', required: false })
  @IsOptional()
  @IsString()
  personagemnome?: string;

  @ApiProperty({ example: 10, description: 'Defesa do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemdefesa?: number;

  @ApiProperty({ example: 5, description: 'CD de magia do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcdmagia?: number;

  @ApiProperty({ example: 9, description: 'Deslocamento do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemdeslocamento?: number;

  @ApiProperty({ example: 50, description: 'Carga do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcarga?: number;

  @ApiProperty({ example: 10, description: 'Espaço de carga do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcargaespaco?: number;

  @ApiProperty({ example: 20, description: 'PV atual do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempv?: number;

  @ApiProperty({ example: 20, description: 'PV total do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempvtotal?: number;

  @ApiProperty({ example: 10, description: 'PM atual do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempm?: number;

  @ApiProperty({ example: 10, description: 'PM total do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempmtotal?: number;

  @ApiProperty({ example: 0, description: 'Experiência do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemexperiencia?: number;

  @ApiProperty({ example: 0, description: 'Tibar do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemtibar?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do deus associado', required: false })
  @IsOptional()
  @IsUUID()
  deusid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da origem associada', required: false })
  @IsOptional()
  @IsUUID()
  origemid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada', required: false })
  @IsOptional()
  @IsUUID()
  racaid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do tamanho associado', required: false })
  @IsOptional()
  @IsUUID()
  tamanhoid?: string;
}

export class PersonagemResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do personagem' })
  @IsUUID()
  personagemid!: string;

  @ApiProperty({ example: 'Frodo Bolseiro', description: 'Nome do personagem' })
  @IsString()
  personagemnome!: string;

  @ApiProperty({ example: 10, description: 'Defesa do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemdefesa?: number;

  @ApiProperty({ example: 5, description: 'CD de magia do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcdmagia?: number;

  @ApiProperty({ example: 9, description: 'Deslocamento do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemdeslocamento?: number;

  @ApiProperty({ example: 50, description: 'Carga do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcarga?: number;

  @ApiProperty({ example: 10, description: 'Espaço de carga do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemcargaespaco?: number;

  @ApiProperty({ example: 20, description: 'PV atual do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempv?: number;

  @ApiProperty({ example: 20, description: 'PV total do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempvtotal?: number;

  @ApiProperty({ example: 10, description: 'PM atual do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempm?: number;

  @ApiProperty({ example: 10, description: 'PM total do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagempmtotal?: number;

  @ApiProperty({ example: 0, description: 'Experiência do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemexperiencia?: number;

  @ApiProperty({ example: 0, description: 'Tibar do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagemtibar?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do deus associado', required: false })
  @IsOptional()
  @IsUUID()
  deusid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da origem associada', required: false })
  @IsOptional()
  @IsUUID()
  origemid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada', required: false })
  @IsOptional()
  @IsUUID()
  racaid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do tamanho associado', required: false })
  @IsOptional()
  @IsUUID()
  tamanhoid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do usuário associado', required: false })
  @IsOptional()
  @IsUUID()
  usuarioid?: string;
}