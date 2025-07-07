import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClasseProficienciaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada' })
  @IsNotEmpty()
  @IsUUID()
  classeid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da proficiência associada' })
  @IsNotEmpty()
  @IsUUID()
  proficienciaid!: string;
}

export class UpdateClasseProficienciaDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada', required: false })
  @IsOptional()
  @IsUUID()
  classeid?: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da proficiência associada', required: false })
  @IsOptional()
  @IsUUID()
  proficienciaid?: string;
}

export class ClasseProficienciaResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do relacionamento classe-proficiência' })
  classeproficienciaid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe associada' })
  classeid!: string;

  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da proficiência associada' })
  proficienciaid!: string;
}