import { IsNotEmpty, IsString, IsInt, Min, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModMagiaDto {
  @ApiProperty({ example: 2, description: 'Custo do modificador da magia' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  modmagiacusto?: number;

  @ApiProperty({ example: 'Aumenta o dano da magia em 1d6', description: 'Descrição do modificador' })
  @IsNotEmpty()
  @IsString()
  modmagiadescricao!: string;

  @ApiProperty({ example: 1, description: 'Círculo do modificador da magia' })
  @IsNotEmpty()
  @IsString()
  modmagiaexclusivo?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da magia associada' })
  @IsNotEmpty()
  @IsUUID()
  magiaid!: string;
}

export class UpdateModMagiaDto {
  @ApiProperty({ example: 3, description: 'Custo do modificador da magia', required: false })
  @IsInt()
  @Min(0)
  modmagiacusto?: number;

  @ApiProperty({ example: 'Nova descrição do modificador', description: 'Descrição do modificador', required: false })
  @IsString()
  modmagiadescricao?: string;

  @ApiProperty({ example: 2, description: 'Círculo do modificador da magia', required: false })
  @IsString()
  modmagiaexclusivo?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da magia associada', required: false })
  @IsUUID()
  magiaid?: string;
}

export class ModMagiaResponseDto {
  @ApiProperty({ example: 'c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8', description: 'ID do modificador da magia' })
  modmagiaid!: string;

  @ApiProperty({ example: 2, description: 'Custo do modificador da magia' })
  modmagiacusto!: number;

  @ApiProperty({ example: 'Aumenta o dano da magia em 1d6', description: 'Descrição do modificador' })
  modmagiadescricao!: string;

  @ApiProperty({ example: '(Apenas Paladinos)', description: 'Aprimoramento exclusivo de classes os tipos de conjuradores' })
  modmagiaexclusivo!: string;

  @ApiProperty({ 
    example: { magiaid: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', magianome: 'Bola de Fogo' },
    description: 'Magia associada'
  })
  magia!: {
    magiaid: string;
    magianome: string;
  };
}