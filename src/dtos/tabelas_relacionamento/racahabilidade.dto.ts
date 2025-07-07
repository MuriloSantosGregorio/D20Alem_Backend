import { IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRacaHabilidadeDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada' })
  @IsNotEmpty()
  @IsUUID()
  racaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada' })
  @IsNotEmpty()
  @IsUUID()
  habilidadeid!: string;

  @ApiProperty({ example: true, description: 'Indica se a habilidade é modular', required: false })
  @IsOptional()
  @IsBoolean()
  racahabilidademodular?: boolean;
}

export class UpdateRacaHabilidadeDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada', required: false })
  @IsOptional()
  @IsUUID()
  racaid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada', required: false })
  @IsOptional()
  @IsUUID()
  habilidadeid?: string;

  @ApiProperty({ example: false, description: 'Indica se a habilidade é modular', required: false })
  @IsOptional()
  @IsBoolean()
  racahabilidademodular?: boolean;
}

export class RacaHabilidadeResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do relacionamento raça-habilidade' })
  racahabilidadeid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada' })
  racaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade associada' })
  habilidadeid!: string;

  @ApiProperty({ example: true, description: 'Indica se a habilidade é modular', required: false })
  racahabilidademodular?: boolean;
}