import { IsNotEmpty, IsString, MaxLength, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClasseDto {
    @ApiProperty({ example: 'Guerreiro', description: 'Nome da classe' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    classenome!: string;

    @ApiProperty({ example: 'Classe voltada para o combate corpo a corpo', description: 'Descrição da classe' })
    @IsNotEmpty()
    @IsString()
    classedescricao!: string;

    @ApiProperty({ example: 10, description: 'Pontos de vida iniciais da classe' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    classepvinicial!: number;

    @ApiProperty({ example: 6, description: 'Pontos de vida ganhos por nível' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    classepvnivel!: number;

    @ApiProperty({ example: 4, description: 'Pontos de mana ganhos por nível' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    classepmnivel!: number;

    @ApiProperty({ example: 3, description: 'Número de perícias da classe' })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    classenumpericias!: number;
}

export class UpdateClasseDto {
    @ApiProperty({ example: 'Guerreiro', description: 'Nome da classe', required: false })
    @IsString()
    @MaxLength(10)
    classenome?: string;

    @ApiProperty({ example: 'Nova descrição da classe', description: 'Descrição da classe', required: false })
    @IsString()
    classedescricao?: string;

    @ApiProperty({ example: 12, description: 'Pontos de vida iniciais da classe', required: false })
    @IsInt()
    @Min(0)
    classepvinicial?: number;

    @ApiProperty({ example: 7, description: 'Pontos de vida ganhos por nível', required: false })
    @IsInt()
    @Min(0)
    classepvnivel?: number;

    @ApiProperty({ example: 5, description: 'Pontos de mana ganhos por nível', required: false })
    @IsInt()
    @Min(0)
    classepmnivel?: number;

    @ApiProperty({ example: 4, description: 'Número de perícias da classe', required: false })
    @IsInt()
    @Min(0)
    classenumpericias?: number;
}

export class ClasseResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da classe' })
    classeid!: string;

    @ApiProperty({ example: 'Guerreiro', description: 'Nome da classe' })
    classenome!: string;

    @ApiProperty({ example: 'Classe voltada para o combate corpo a corpo', description: 'Descrição da classe' })
    classedescricao!: string;

    @ApiProperty({ example: 10, description: 'Pontos de vida iniciais da classe' })
    classepvinicial!: number;

    @ApiProperty({ example: 6, description: 'Pontos de vida ganhos por nível' })
    classepvnivel!: number;

    @ApiProperty({ example: 4, description: 'Pontos de mana ganhos por nível' })
    classepmnivel!: number;

    @ApiProperty({ example: 3, description: 'Número de perícias da classe' })
    classenumpericias!: number;
}