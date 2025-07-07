import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonagemProficienciaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da proficiência associada' })
  @IsNotEmpty()
  @IsUUID()
  proficienciaid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  @IsNotEmpty()
  @IsUUID()
  personagemid!: string;
}

export class UpdatePersonagemProficienciaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da proficiência associada', required: false })
  @IsOptional()
  @IsUUID()
  proficienciaid?: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado', required: false })
  @IsOptional()
  @IsUUID()
  personagemid?: string;
}

export class PersonagemProficienciaResponseDto {
  @ApiProperty({ example: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', description: 'ID da associação personagem-proficiência' })
  personagemproficienciaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da proficiência associada' })
  proficienciaid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  personagemid!: string;
}