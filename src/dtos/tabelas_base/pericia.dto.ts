import { IsNotEmpty, IsString, IsBoolean, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePericiaDto {
  @ApiProperty({ example: 'Acrobacia', description: 'Nome da perícia' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  pericianome!: string;

  @ApiProperty({ example: false, description: 'Se sofre penalidade de armadura' })
  @IsNotEmpty()
  @IsBoolean()
  periciaarmadura!: boolean;

  @ApiProperty({ example: true, description: 'Se é perícia treinada' })
  @IsNotEmpty()
  @IsBoolean()
  periciatreinada!: boolean;

  @ApiProperty({ example: 'Descrição detalhada...', description: 'Descrição da perícia' })
  @IsNotEmpty()
  @IsString()
  periciadescricao!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado' })
  @IsNotEmpty()
  @IsUUID()
  atributoid!: string;
}

export class UpdatePericiaDto {
  @ApiProperty({ example: 'Acrobacia', description: 'Nome da perícia', required: false })
  @IsString()
  @MaxLength(25)
  pericianome?: string;

  @ApiProperty({ example: false, description: 'Se sofre penalidade de armadura', required: false })
  @IsBoolean()
  periciaarmadura?: boolean;

  @ApiProperty({ example: true, description: 'Se é perícia treinada', required: false })
  @IsBoolean()
  periciatreinada?: boolean;

  @ApiProperty({ example: 'Nova descrição...', description: 'Descrição da perícia', required: false })
  @IsString()
  periciadescricao?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado', required: false })
  @IsUUID()
  atributoid?: string;
}

export class PericiaResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da perícia' })
  periciaid!: string;

  @ApiProperty({ example: 'Acrobacia', description: 'Nome da perícia' })
  pericianome!: string;

  @ApiProperty({ example: false, description: 'Se sofre penalidade de armadura' })
  periciaarmadura!: boolean;

  @ApiProperty({ example: true, description: 'Se é perícia treinada' })
  periciatreinada!: boolean;

  @ApiProperty({ example: 'Descrição detalhada...', description: 'Descrição da perícia' })
  periciadescricao!: string;

  @ApiProperty({ 
    example: { atributoid: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', atributonome: 'Destreza' },
    description: 'Atributo associado',
    nullable: true 
  })
  atributo!: {
    atributoid: string;
    atributonome: string;
  } | null;
}