import { IsNotEmpty, IsUUID, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonagemAtributoDto {
  @ApiProperty({ example: 16, description: 'Valor do atributo do personagem' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  personagematributovalor!: number;

  @ApiProperty({ example: 2, description: 'Modificador temporário do atributo', required: false })
  @IsOptional()
  @IsInt()
  modificadortemporario?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado' })
  @IsNotEmpty()
  @IsUUID()
  atributoid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  @IsNotEmpty()
  @IsUUID()
  personagemid!: string;
}

export class UpdatePersonagemAtributoDto {
  @ApiProperty({ example: 18, description: 'Valor do atributo do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  personagematributovalor?: number;

  @ApiProperty({ example: 3, description: 'Modificador temporário do atributo', required: false })
  @IsOptional()
  @IsInt()
  modificadortemporario?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado', required: false })
  @IsOptional()
  @IsUUID()
  atributoid?: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado', required: false })
  @IsOptional()
  @IsUUID()
  personagemid?: string;
}

export class PersonagemAtributoResponseDto {
  @ApiProperty({ example: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', description: 'ID do personagem-atributo' })
  personagematributoid!: string;

  @ApiProperty({ example: 16, description: 'Valor do atributo do personagem' })
  personagematributovalor!: number;

  @ApiProperty({ example: 2, description: 'Modificador temporário do atributo', required: false })
  modificadortemporario?: number | null;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado' })
  atributoid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  personagemid!: string;
}