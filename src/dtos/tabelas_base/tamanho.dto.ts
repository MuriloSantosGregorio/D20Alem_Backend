import { IsNotEmpty, IsString, MaxLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTamanhoDto {
  @ApiProperty({ example: 'Médio', description: 'Categoria de tamanho' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  tamanhocategoria!: string;

  @ApiProperty({ example: '1,5', description: 'Alcance em espaços' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  tamanhoalcanceespaco!: string;

  @ApiProperty({ example: 0, description: 'Modificador de furtividade' })
  @IsNotEmpty()
  @IsInt()
  tamanhofurtividade!: number;

  @ApiProperty({ example: 0, description: 'Modificador de manobra' })
  @IsNotEmpty()
  @IsInt()
  tamanhomanobra!: number;

  @ApiProperty({ example: 0, description: 'Número do tamanho' })
  @IsNotEmpty()
  @IsInt()
  tamanhonumero!: number;
}

export class UpdateTamanhoDto {
  @ApiProperty({ example: 'Médio', description: 'Categoria de tamanho', required: false })
  @IsString()
  @MaxLength(10)
  tamanhocategoria?: string;

  @ApiProperty({ example: '1,5', description: 'Alcance em espaços', required: false })
  @IsString()
  @MaxLength(4)
  tamanhoalcanceespaco?: string;

  @ApiProperty({ example: 0, description: 'Modificador de furtividade', required: false })
  @IsInt()
  tamanhofurtividade?: number;

  @ApiProperty({ example: 0, description: 'Modificador de manobra', required: false })
  @IsInt()
  tamanhomanobra?: number;

  @ApiProperty({ example: 0, description: 'Número do tamanho', required: false })
  @IsInt()
  tamanhonumero?: number;
}

export class TamanhoResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do tamanho' })
  tamanhoid!: string;

  @ApiProperty({ example: 'Médio', description: 'Categoria de tamanho' })
  tamanhocategoria!: string;

  @ApiProperty({ example: '1,5', description: 'Alcance em espaços' })
  tamanhoalcanceespaco!: string;

  @ApiProperty({ example: 0, description: 'Modificador de furtividade' })
  tamanhofurtividade!: number;

  @ApiProperty({ example: 0, description: 'Modificador de manobra' })
  tamanhomanobra!: number;

  @ApiProperty({ example: 0, description: 'Número do tamanho' })
  tamanhonumero!: number;
}