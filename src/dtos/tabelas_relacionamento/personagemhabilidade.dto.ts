import { IsNotEmpty, IsUUID, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonagemHabilidadeDto {
  @ApiProperty({ example: 'Classe', description: 'Fonte da habilidade do personagem' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  personagemhabilidadefonte!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada' })
  @IsNotEmpty()
  @IsUUID()
  habilidadeid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  @IsNotEmpty()
  @IsUUID()
  personagemid!: string;
}

export class UpdatePersonagemHabilidadeDto {
  @ApiProperty({ example: 'Raça', description: 'Fonte da habilidade do personagem', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(25)
  personagemhabilidadefonte?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada', required: false })
  @IsOptional()
  @IsUUID()
  habilidadeid?: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado', required: false })
  @IsOptional()
  @IsUUID()
  personagemid?: string;
}

export class PersonagemHabilidadeResponseDto {
  @ApiProperty({ example: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', description: 'ID da associação personagem-habilidade' })
  personagemhabilidadeid!: string;

  @ApiProperty({ example: 'Classe', description: 'Fonte da habilidade do personagem' })
  personagemhabilidadefonte!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada' })
  habilidadeid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  personagemid!: string;
}