import { IsNotEmpty, IsUUID, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonagemClasseDto {
  @ApiProperty({ example: 5, description: 'Nível da classe do personagem' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  personagemclasse!: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada' })
  @IsNotEmpty()
  @IsUUID()
  classeid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  @IsNotEmpty()
  @IsUUID()
  personagemid!: string;
}

export class UpdatePersonagemClasseDto {
  @ApiProperty({ example: 6, description: 'Nível da classe do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  personagemclasse?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada', required: false })
  @IsOptional()
  @IsUUID()
  classeid?: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado', required: false })
  @IsOptional()
  @IsUUID()
  personagemid?: string;
}

export class PersonagemClasseResponseDto {
  @ApiProperty({ example: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', description: 'ID da associação personagem-classe' })
  personagemclasseid!: string;

  @ApiProperty({ example: 5, description: 'Nível da classe do personagem' })
  personagemclasse!: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada' })
  classeid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  personagemid!: string;
}