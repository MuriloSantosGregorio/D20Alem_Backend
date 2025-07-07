import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrigemPericiaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da origem associada' })
  @IsNotEmpty()
  @IsUUID()
  origemid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da perícia associada' })
  @IsNotEmpty()
  @IsUUID()
  periciaid!: string;
}

export class UpdateOrigemPericiaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da origem associada', required: false })
  @IsOptional()
  @IsUUID()
  origemid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da perícia associada', required: false })
  @IsOptional()
  @IsUUID()
  periciaid?: string;
}

export class OrigemPericiaResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do relacionamento origem-perícia' })
  origempericiaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da origem associada' })
  origemid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da perícia associada' })
  periciaid!: string;
}