import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Токен авторизации не найден.');

    try {
      const user = await this.userRepository.findOneBy({ token });
      if (!user) throw new UnauthorizedException('Недействительный токен.');

      request.user = user;
    } catch (error) {
      throw new UnauthorizedException('Ошибка аутентификации.');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
