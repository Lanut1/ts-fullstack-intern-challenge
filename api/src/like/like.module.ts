import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Like } from './entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    UserModule
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
