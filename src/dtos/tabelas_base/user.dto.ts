import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
    @IsNotEmpty()
    @IsString()
    usuarionome!: string;

    @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
    @IsNotEmpty()
    @IsEmail()
    usuarioemail!: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário', minLength: 6 })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    usuariosenha!: string;
}

export class UpdateUserDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário', required: false })
    @IsString()
    usuarionome?: string;

    @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário', required: false })
    @IsEmail()
    usuarioemail?: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário', minLength: 6, required: false })
    @IsString()
    @MinLength(6)
    usuariosenha?: string;
}

export class UserResponseDto {
    @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6', description: 'ID do usuário' })
    usuarioid!: string;

    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
    usuarionome!: string;

    @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
    usuarioemail!: string;

    @ApiProperty({ example: true, description: 'Status do usuário' })
    usuariostatus!: boolean;

    @ApiProperty({ example: '2023-01-01', description: 'Data de criação' })
    created_at!: string;

    @ApiProperty({ example: '2023-01-01', description: 'Data de atualização' })
    updated_at!: string;
}