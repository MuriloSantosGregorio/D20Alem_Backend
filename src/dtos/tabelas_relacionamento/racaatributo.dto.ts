import { IsNotEmpty, IsUUID, IsInt, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRacaAtributoDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada' })
  @IsNotEmpty()
  @IsUUID()
  racaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado' })
  @IsNotEmpty()
  @IsUUID()
  atributoid!: string;

  @ApiProperty({ example: 10, description: 'Valor do atributo associado à raça' })
  @IsNotEmpty()
  @IsInt()
  racaatributovalor!: number;

  @ApiProperty({ example: 'Força', description: 'Tipo do atributo', maxLength: 10 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  racaatributotipo!: string;
}

export class UpdateRacaAtributoDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada', required: false })
  @IsOptional()
  @IsUUID()
  racaid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado', required: false })
  @IsOptional()
  @IsUUID()
  atributoid?: string;

  @ApiProperty({ example: 12, description: 'Valor do atributo associado à raça', required: false })
  @IsOptional()
  @IsInt()
  racaatributovalor?: number;

  @ApiProperty({ example: 'Destreza', description: 'Tipo do atributo', maxLength: 10, required: false })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  racaatributotipo?: string;
}

export class RacaAtributoResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do relacionamento raça-atributo' })
  racaatributoid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada' })
  racaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo associado' })
  atributoid!: string;

  @ApiProperty({ example: 10, description: 'Valor do atributo associado à raça' })
  racaatributovalor!: number;

  @ApiProperty({ example: 'Força', description: 'Tipo do atributo', maxLength: 10 })
  racaatributotipo!: string;
}