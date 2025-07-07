import { AppDataSource } from '../../config/database';
import { Usuarios } from '../../entities/Usuarios';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../../dtos/tabelas_base/user.dto';
import { DeleteResult, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { ApiError } from '../../utils/apiError';

export class UserService {
    private userRepository: Repository<Usuarios>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Usuarios);
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const { usuarioemail, usuariosenha } = createUserDto;

        // Verifica se o usuário já existe
        const existingUser = await this.userRepository.findOne({ where: { usuarioemail } });
        if (existingUser) {
            throw new ApiError(400, 'Email já está em uso');
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(usuariosenha, 10);

        const newUser = this.userRepository.create({
            ...createUserDto,
            usuariosenha: hashedPassword,
        });

        await this.userRepository.save(newUser);

        // Remove a senha antes de retornar
        const { usuariosenha: _, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    }

    async getAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.find();
        return users.map(user => {
            const { usuariosenha, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }

    async getUserById(id: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({ where: { usuarioid: id } });
        if (!user) {
            throw new ApiError(404, 'Usuário não encontrado');
        }

        const { usuariosenha, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.findOne({ where: { usuarioid: id } });
        if (!user) {
            throw new ApiError(404, 'Usuário não encontrado');
        }

        if (updateUserDto.usuarioemail && updateUserDto.usuarioemail !== user.usuarioemail) {
            const existingUser = await this.userRepository.findOne({ 
                where: { usuarioemail: updateUserDto.usuarioemail } 
            });
            if (existingUser) {
                throw new ApiError(400, 'Email já está em uso');
            }
        }

        if (updateUserDto.usuariosenha) {
            updateUserDto.usuariosenha = await bcrypt.hash(updateUserDto.usuariosenha, 10);
        }

        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOne({ where: { usuarioid: id } });

        const { usuariosenha, ...userWithoutPassword } = updatedUser!;
        return userWithoutPassword;
    }

    async deleteUser(id: string): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new ApiError(404, 'Usuário não encontrado');
        }
    }
}