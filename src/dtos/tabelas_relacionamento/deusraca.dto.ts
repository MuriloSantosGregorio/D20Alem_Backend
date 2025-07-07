import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeusRacaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do deus associado' })
  @IsNotEmpty()
  @IsUUID()
  deusid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada' })
  @IsNotEmpty()
  @IsUUID()
  racaid!: string;
}

export class UpdateDeusRacaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do deus associado', required: false })
  @IsOptional()
  @IsUUID()
  deusid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada', required: false })
  @IsOptional()
  @IsUUID()
  racaid?: string;
}

export class DeusRacaResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do relacionamento deus-raça' })
  deusracaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do deus associado' })
  deusid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da raça associada' })
  racaid!: string;
}