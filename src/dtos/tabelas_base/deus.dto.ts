import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeusDto {
    @ApiProperty({ example: 'Tanna-Toh', description: 'Nome do deus' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    deusnome!: string;

    @ApiProperty({ example: 'Livro com pena', description: 'Símbolo do deus' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(125)
    deussimbolo!: string;

    @ApiProperty({ example: 'Luz', description: 'Energia do deus' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(8)
    deusenergia!: string;

    @ApiProperty({ example: 'Cajado', description: 'Arma do deus' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(25)
    deusarma!: string;

    @ApiProperty({ example: 'Deus do conhecimento e da magia', description: 'Descrição do deus' })
    @IsNotEmpty()
    @IsString()
    deusdescricao!: string;

    @ApiProperty({ example: 'Promover o conhecimento', description: 'Objetivos do deus' })
    @IsNotEmpty()
    @IsString()
    deusobjetivos!: string;

    @ApiProperty({ example: 'Estudar e ensinar', description: 'Obrigações dos seguidores' })
    @IsNotEmpty()
    @IsString()
    deusobrigacoes!: string;
}

export class UpdateDeusDto {
    @ApiProperty({ example: 'Tanna-Toh', description: 'Nome do deus', required: false })
    @IsString()
    @MaxLength(20)
    deusnome?: string;

    @ApiProperty({ example: 'Livro com pena', description: 'Símbolo do deus', required: false })
    @IsString()
    @MaxLength(125)
    deussimbolo?: string;

    @ApiProperty({ example: 'Luz', description: 'Energia do deus', required: false })
    @IsString()
    @MaxLength(8)
    deusenergia?: string;

    @ApiProperty({ example: 'Cajado', description: 'Arma do deus', required: false })
    @IsString()
    @MaxLength(25)
    deusarma?: string;

    @ApiProperty({ example: 'Nova descrição do deus', description: 'Descrição do deus', required: false })
    @IsString()
    deusdescricao?: string;

    @ApiProperty({ example: 'Novos objetivos', description: 'Objetivos do deus', required: false })
    @IsString()
    deusobjetivos?: string;

    @ApiProperty({ example: 'Novas obrigações', description: 'Obrigações dos seguidores', required: false })
    @IsString()
    deusobrigacoes?: string;
}

export class DeusResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do deus' })
    deusid!: string;

    @ApiProperty({ example: 'Tanna-Toh', description: 'Nome do deus' })
    deusnome!: string;

    @ApiProperty({ example: 'Livro com pena', description: 'Símbolo do deus' })
    deussimbolo!: string;

    @ApiProperty({ example: 'Luz', description: 'Energia do deus' })
    deusenergia!: string;

    @ApiProperty({ example: 'Cajado', description: 'Arma do deus' })
    deusarma!: string;

    @ApiProperty({ example: 'Deus do conhecimento e da magia', description: 'Descrição do deus' })
    deusdescricao!: string;

    @ApiProperty({ example: 'Promover o conhecimento', description: 'Objetivos do deus' })
    deusobjetivos!: string;

    @ApiProperty({ example: 'Estudar e ensinar', description: 'Obrigações dos seguidores' })
    deusobrigacoes!: string;
}