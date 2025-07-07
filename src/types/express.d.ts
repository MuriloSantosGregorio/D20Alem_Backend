import { UserResponseDto } from '../dtos/tabelas_base/user.dto';

declare global {
  namespace Express {
    interface Request {
      user?: UserResponseDto;
    }
  }
}