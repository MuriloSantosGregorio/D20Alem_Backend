import { AppDataSource } from '../config/database';
import { Usuarios } from '../entities/Usuarios';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ApiError } from '../utils/apiError';
import { UserResponseDto } from '../dtos/tabelas_base/user.dto';

export class AuthService {
    private userRepository = AppDataSource.getRepository(Usuarios);
    private readonly jwtSecret: string;
    private readonly tokenExpiration: string;

    constructor() {
        // Garanta que estas variáveis de ambiente estão configuradas no seu .env
        this.jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
        this.tokenExpiration = process.env.JWT_EXPIRATION || '1h';
        
        if (!process.env.JWT_SECRET) {
            console.warn('Aviso: JWT_SECRET não está definido no .env, usando valor padrão');
        }
    }

    async register(registerDto: RegisterDto): Promise<UserResponseDto> {
        const { name, email, password } = registerDto;

        const existingUser = await this.userRepository.findOne({ where: { usuarioemail: email } });
        if (existingUser) {
            throw new ApiError(400, 'Email já está em uso');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = this.userRepository.create({
            usuarionome: name,
            usuarioemail: email,
            usuariosenha: hashedPassword,
        });

        await this.userRepository.save(newUser);

        // Type assertion para UserResponseDto
        return this.toUserResponseDto(newUser);
    }

    async login(loginDto: LoginDto): Promise<{ token: string; user: UserResponseDto }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ 
            where: { usuarioemail: email },
            select: ['usuarioid', 'usuarionome', 'usuarioemail', 'usuariosenha', 'usuariostatus']
        });

        if (!user) {
            throw new ApiError(401, 'Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.usuariosenha);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Credenciais inválidas');
        }

        if (!user.usuariostatus) {
            throw new ApiError(403, 'Usuário desativado');
        }

        // Configuração correta do token JWT
        const payload = { 
            userId: user.usuarioid,
            email: user.usuarioemail
        };

        const options: SignOptions = {
            algorithm: 'HS256'
        };

        const token = jwt.sign(payload, this.jwtSecret, options);

        return {
            token,
            user: this.toUserResponseDto(user)
        };
    }

    async validateToken(token: string): Promise<UserResponseDto> {
        try {
            const decoded = jwt.verify(token, this.jwtSecret) as { userId: string };
            
            const user = await this.userRepository.findOne({ 
                where: { usuarioid: decoded.userId },
                select: ['usuarioid', 'usuarionome', 'usuarioemail', 'usuariostatus', 'created_at', 'updated_at']
            });

            if (!user) {
                throw new ApiError(401, 'Usuário não encontrado');
            }

            return this.toUserResponseDto(user);
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new ApiError(401, 'Token expirado');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new ApiError(401, 'Token inválido');
            }
            throw new ApiError(401, 'Erro na validação do token');
        }
    }

    private toUserResponseDto(user: Usuarios): UserResponseDto {
        return {
            usuarioid: user.usuarioid,
            usuarionome: user.usuarionome,
            usuarioemail: user.usuarioemail,
            usuariostatus: user.usuariostatus,
            created_at: user.created_at,
            updated_at: user.updated_at
        };
    }

    
}