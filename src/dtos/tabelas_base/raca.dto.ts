import { IsNotEmpty, IsString, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRacaDto {
  @ApiProperty({ example: 'Elfo', description: 'Nome da raça' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  racanome!: string;

  @ApiProperty({ example: 'Descrição detalhada da raça...', description: 'Descrição da raça' })
  @IsNotEmpty()
  @IsString()
  racadescricao!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do tamanho associado' })
  @IsNotEmpty()
  @IsUUID()
  tamanhoid!: string;
}

export class UpdateRacaDto {
  @ApiProperty({ example: 'Elfo', description: 'Nome da raça', required: false })
  @IsString()
  @MaxLength(25)
  racanome?: string;

  @ApiProperty({ example: 'Nova descrição...', description: 'Descrição da raça', required: false })
  @IsString()
  racadescricao?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do tamanho associado', required: false })
  @IsUUID()
  tamanhoid?: string;
}

export class RacaResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça' })
  racaid!: string;

  @ApiProperty({ example: 'Elfo', description: 'Nome da raça' })
  racanome!: string;

  @ApiProperty({ example: 'Descrição detalhada...', description: 'Descrição da raça' })
  racadescricao!: string;

  @ApiProperty({ 
    example: { tamanhoid: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', tamanhocategoria: 'Médio' },
    description: 'Tamanho associado' 
  })
  tamanho!: {
    tamanhoid: string;
    tamanhocategoria: string;
  };
}