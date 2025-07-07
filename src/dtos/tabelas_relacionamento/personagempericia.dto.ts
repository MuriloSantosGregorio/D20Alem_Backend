import { IsNotEmpty, IsUUID, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonagemPericiaDto {
  @ApiProperty({ example: 2, description: 'Bônus adicional da perícia do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  bonusadicional?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da perícia associada' })
  @IsNotEmpty()
  @IsUUID()
  periciaid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  @IsNotEmpty()
  @IsUUID()
  personagemid!: string;
}

export class UpdatePersonagemPericiaDto {
  @ApiProperty({ example: 3, description: 'Bônus adicional da perícia do personagem', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  bonusadicional?: number;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da perícia associada', required: false })
  @IsOptional()
  @IsUUID()
  periciaid?: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado', required: false })
  @IsOptional()
  @IsUUID()
  personagemid?: string;
}

export class PersonagemPericiaResponseDto {
  @ApiProperty({ example: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', description: 'ID da associação personagem-perícia' })
  personagempericiaid!: string;

  @ApiProperty({ example: 2, description: 'Bônus adicional da perícia do personagem', required: false })
  bonusadicional?: number | null;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da perícia associada' })
  periciaid!: string;

  @ApiProperty({ example: 'b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7', description: 'ID do personagem associado' })
  personagemid!: string;
}