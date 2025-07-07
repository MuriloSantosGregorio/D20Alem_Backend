import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrigemDto {
  @ApiProperty({ example: 'Acólito', description: 'Nome da origem' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  origemnome!: string;

  @ApiProperty({ example: 'Descrição detalhada...', description: 'Descrição da origem' })
  @IsNotEmpty()
  @IsString()
  origemdescricao!: string;
}

export class UpdateOrigemDto {
  @ApiProperty({ example: 'Acólito', description: 'Nome da origem', required: false })
  @IsString()
  @MaxLength(25)
  origemnome?: string;

  @ApiProperty({ example: 'Nova descrição...', description: 'Descrição da origem', required: false })
  @IsString()
  origemdescricao?: string;
}

export class OrigemResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da origem' })
  origemid!: string;

  @ApiProperty({ example: 'Acólito', description: 'Nome da origem' })
  origemnome!: string;

  @ApiProperty({ example: 'Descrição detalhada...', description: 'Descrição da origem' })
  origemdescricao!: string;
}