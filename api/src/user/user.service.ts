import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findById(userId: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  private generateToken(user: User): string {
    const secretSalt = this.configService.get<string>('SECRET_SALT');
    const payload = user.id + secretSalt;
    return crypto.createHash('sha256').update(payload).digest('hex');
  }

  async authenticate(authUserDto: LoginUserDto): Promise<{ user: User }> {
    const { username, password } = authUserDto;

    let user = await this.userRepository.findOneBy({ username });

    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException('Неверный логин или пароль.');
      }

    } else {
      user = this.userRepository.create({ username, password });
    }

    const token = this.generateToken(user);
    user.token = token;

    await this.userRepository.save(user);
    delete user.password;

    return { user };
  }
}
