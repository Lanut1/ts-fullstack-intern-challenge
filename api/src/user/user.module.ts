import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService, AuthGuard, TypeOrmModule],
})
export class UserModule {}
