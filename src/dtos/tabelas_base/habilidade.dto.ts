import { IsNotEmpty, IsString, MaxLength, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabilidadeDto {
    @ApiProperty({ example: 'Ataque Rápido', description: 'Nome da habilidade' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    habilidadenome!: string;

    @ApiProperty({ example: 'Permite um ataque adicional por turno', description: 'Descrição da habilidade' })
    @IsNotEmpty()
    @IsString()
    habilidadedescricao!: string;

    @ApiProperty({ example: 'Pessoal', description: 'Alcance da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    habilidadealcance?: string;

    @ApiProperty({ example: '1 turno', description: 'Duração da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    habilidadeduracao?: string;

    @ApiProperty({ example: 5, description: 'Custo de pontos de mana da habilidade', required: false })
    @IsOptional()
    @IsInt()
    @Min(0)
    habilidadepmcusto?: number;

    @ApiProperty({ example: 'Ação Padrão', description: 'Tempo de execução da habilidade' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    habilidadeexecucao!: string;

    @ApiProperty({ example: 'Nenhuma', description: 'Resistência necessária contra a habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    habilidaderesistencia?: string;

    @ApiProperty({ example: 'Dano', description: 'Efeito da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(15)
    habilidadeefeito?: string;
}

export class UpdateHabilidadeDto {
    @ApiProperty({ example: 'Ataque Rápido', description: 'Nome da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    habilidadenome?: string;

    @ApiProperty({ example: 'Nova descrição da habilidade', description: 'Descrição da habilidade', required: false })
    @IsOptional()
    @IsString()
    habilidadedescricao?: string;

    @ApiProperty({ example: 'Pessoal', description: 'Alcance da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(10)
    habilidadealcance?: string;

    @ApiProperty({ example: '2 turnos', description: 'Duração da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    habilidadeduracao?: string;

    @ApiProperty({ example: 6, description: 'Custo de pontos de mana da habilidade', required: false })
    @IsOptional()
    @IsInt()
    @Min(0)
    habilidadepmcusto?: number;

    @ApiProperty({ example: 'Ação Rápida', description: 'Tempo de execução da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(15)
    habilidadeexecucao?: string;

    @ApiProperty({ example: 'Fortitude', description: 'Resistência necessária contra a habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    habilidaderesistencia?: string;

    @ApiProperty({ example: 'Dano Extra', description: 'Efeito da habilidade', required: false })
    @IsOptional()
    @IsString()
    @MaxLength(15)
    habilidadeefeito?: string;
}

export class HabilidadeResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID da habilidade' })
    habilidadeid!: string;

    @ApiProperty({ example: 'Ataque Rápido', description: 'Nome da habilidade' })
    habilidadenome!: string;

    @ApiProperty({ example: 'Permite um ataque adicional por turno', description: 'Descrição da habilidade' })
    habilidadedescricao!: string;

    @ApiProperty({ example: 'Pessoal', description: 'Alcance da habilidade', required: false })
    habilidadealcance?: string;

    @ApiProperty({ example: '1 turno', description: 'Duração da habilidade', required: false })
    habilidadeduracao?: string;

    @ApiProperty({ example: 5, description: 'Custo de pontos de mana da habilidade', required: false })
    habilidadepmcusto?: number;

    @ApiProperty({ example: 'Ação Padrão', description: 'Tempo de execução da habilidade' })
    habilidadeexecucao!: string;

    @ApiProperty({ example: 'Nenhuma', description: 'Resistência necessária contra a habilidade', required: false })
    habilidaderesistencia?: string;

    @ApiProperty({ example: 'Dano', description: 'Efeito da habilidade', required: false })
    habilidadeefeito?: string;
}