import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAtributoDto {
    @ApiProperty({ example: 'Força', description: 'Nome do atributo' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    atributonome!: string;

    @ApiProperty({ example: 'Físico', description: 'Tipo do atributo' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(6)
    atributotipo!: string;

    @ApiProperty({ example: 'Representa a força física do personagem', description: 'Descrição do atributo' })
    @IsNotEmpty()
    @IsString()
    atributodescricao!: string;
}

export class UpdateAtributoDto {
    @ApiProperty({ example: 'Força', description: 'Nome do atributo', required: false })
    @IsString()
    @MaxLength(15)
    atributonome?: string;

    @ApiProperty({ example: 'Físico', description: 'Tipo do atributo', required: false })
    @IsString()
    @MaxLength(6)
    atributotipo?: string;

    @ApiProperty({ example: 'Nova descrição do atributo', description: 'Descrição do atributo', required: false })
    @IsString()
    atributodescricao?: string;
}

export class AtributoResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do atributo' })
    atributoid!: string;

    @ApiProperty({ example: 'Força', description: 'Nome do atributo' })
    atributonome!: string;

    @ApiProperty({ example: 'Físico', description: 'Tipo do atributo' })
    atributotipo!: string;

    @ApiProperty({ example: 'Representa a força física do personagem', description: 'Descrição do atributo' })
    atributodescricao!: string;
}