import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMagiaDto {
    @ApiProperty({ example: 'Bola de Fogo', description: 'Nome da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magianome!: string;

    @ApiProperty({ example: 'Evocação', description: 'Escola da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiaescola!: string;

    @ApiProperty({ example: 3, description: 'Círculo da magia' })
    @IsNotEmpty()
    @IsInt()
    magiacirculo!: number;

    @ApiProperty({ example: 'Ataque', description: 'Tipo da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiatipo!: string;

    @ApiProperty({ example: 'Ação Padrão', description: 'Execução da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiaexecucao!: string;

    @ApiProperty({ example: '30 metros', description: 'Alcance da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiaalcance!: string;

    @ApiProperty({ example: '1 criatura', description: 'Alvo da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiaalvo!: string;

    @ApiProperty({ example: 'Esfera de 6 metros', description: 'Área da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiaarea!: string;

    @ApiProperty({ example: 'Causa 1d6 de dano por nível', description: 'Efeito da magia' })
    @IsNotEmpty()
    @IsString()
    magiaefeito!: string;

    @ApiProperty({ example: 'Instantânea', description: 'Duração da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiaduracao!: string;

    @ApiProperty({ example: 'Reflexos', description: 'Resistência da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiaresistencia!: string;

    @ApiProperty({ example: 'Descrição detalhada da magia', description: 'Descrição da magia' })
    @IsNotEmpty()
    @IsString()
    magiadescricao!: string;

    @ApiProperty({ example: 'Verbal, Somático', description: 'Componentes da magia' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    magiacomponente!: string;
}

export class UpdateMagiaDto {
    @ApiProperty({ example: 'Bola de Fogo', description: 'Nome da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magianome?: string;

    @ApiProperty({ example: 'Evocação', description: 'Escola da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiaescola?: string;

    @ApiProperty({ example: 3, description: 'Círculo da magia', required: false })
    @IsOptional()
    @IsInt()
    magiacirculo?: number;

    @ApiProperty({ example: 'Ataque', description: 'Tipo da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiatipo?: string;

    @ApiProperty({ example: 'Ação Padrão', description: 'Execução da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiaexecucao?: string;

    @ApiProperty({ example: '30 metros', description: 'Alcance da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiaalcance?: string;

    @ApiProperty({ example: '1 criatura', description: 'Alvo da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiaalvo?: string;

    @ApiProperty({ example: 'Esfera de 6 metros', description: 'Área da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiaarea?: string;

    @ApiProperty({ example: 'Causa 1d6 de dano por nível', description: 'Efeito da magia', required: false })
    @IsOptional()
    @IsString()
    magiaefeito?: string;

    @ApiProperty({ example: 'Instantânea', description: 'Duração da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiaduracao?: string;

    @ApiProperty({ example: 'Reflexos', description: 'Resistência da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiaresistencia?: string;

    @ApiProperty({ example: 'Nova descrição da magia', description: 'Descrição da magia', required: false })
    @IsOptional()
    @IsString()
    magiadescricao?: string;

    @ApiProperty({ example: 'Verbal, Somático', description: 'Componentes da magia', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    magiacomponente?: string;
}

export class MagiaResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da magia' })
    magiaid!: string;

    @ApiProperty({ example: 'Bola de Fogo', description: 'Nome da magia' })
    magianome!: string;

    @ApiProperty({ example: 'Evocação', description: 'Escola da magia' })
    magiaescola!: string;

    @ApiProperty({ example: 3, description: 'Círculo da magia' })
    magiacirculo!: number;

    @ApiProperty({ example: 'Ataque', description: 'Tipo da magia' })
    magiatipo!: string;

    @ApiProperty({ example: 'Ação Padrão', description: 'Execução da magia' })
    magiaexecucao!: string;

    @ApiProperty({ example: '30 metros', description: 'Alcance da magia' })
    magiaalcance!: string;

    @ApiProperty({ example: '1 criatura', description: 'Alvo da magia' })
    magiaalvo!: string;

    @ApiProperty({ example: 'Esfera de 6 metros', description: 'Área da magia' })
    magiaarea!: string;

    @ApiProperty({ example: 'Causa 1d6 de dano por nível', description: 'Efeito da magia' })
    magiaefeito!: string;

    @ApiProperty({ example: 'Instantânea', description: 'Duração da magia' })
    magiaduracao!: string;

    @ApiProperty({ example: 'Reflexos', description: 'Resistência da magia' })
    magiaresistencia!: string;

    @ApiProperty({ example: 'Descrição detalhada da magia', description: 'Descrição da magia' })
    magiadescricao!: string;

    @ApiProperty({ example: 'Verbal, Somático', description: 'Componentes da magia' })
    magiacomponente!: string;
}