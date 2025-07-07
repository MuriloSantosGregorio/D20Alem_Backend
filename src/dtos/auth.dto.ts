import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    @IsNotEmpty()
    @IsString()
    password!: string;
}

export class RegisterDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    @IsNotEmpty()
    @IsString()
    password!: string;
}