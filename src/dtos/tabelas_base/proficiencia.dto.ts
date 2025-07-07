import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProficienciaDto {
    @ApiProperty({ example: 'Espadas', description: 'Nome da proficiência' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    proficiencianome!: string;
}

export class UpdateProficienciaDto {
    @ApiProperty({ example: 'Espadas', description: 'Nome da proficiência', required: false })
    @IsString()
    @MaxLength(30)
    proficiencianome?: string;
}

export class ProficienciaResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da proficiência' })
    proficienciaid!: string;

    @ApiProperty({ example: 'Espadas', description: 'Nome da proficiência' })
    proficiencianome!: string;
}