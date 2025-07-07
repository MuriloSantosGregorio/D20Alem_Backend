import { IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClasseHabilidadeDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada' })
  @IsNotEmpty()
  @IsUUID()
  classeid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada' })
  @IsNotEmpty()
  @IsUUID()
  habilidadeid!: string;

  @ApiProperty({ example: true, description: 'Indica se a habilidade é modular', required: false })
  @IsOptional()
  @IsBoolean()
  classehabilidadenivel?: number;
}

export class UpdateClasseHabilidadeDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada', required: false })
  @IsOptional()
  @IsUUID()
  classeid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada', required: false })
  @IsOptional()
  @IsUUID()
  habilidadeid?: string;

  @ApiProperty({ example: false, description: 'Indica se a habilidade é modular', required: false })
  @IsOptional()
  @IsBoolean()
  classehabilidadenivel?: number;
}

export class ClasseHabilidadeResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do relacionamento classe-habilidade' })
  classehabilidadeid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada' })
  classeid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada' })
  habilidadeid!: string;

  @ApiProperty({ example: true, description: 'Indica se a habilidade é modular', required: false })
  classehabilidadenivel?: number;
}