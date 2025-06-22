import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepo: Repository<Like>
  ) {};

  async getLikesByUser(user: User) {
    return this.likeRepo.find({ where: { user: { id: user.id } }, order: { created_at: 'DESC' } });
  }

  async addLike(cat_id: string, user: User) {
    const existingLike = await this.likeRepo.findOne({ where: { user, cat_id }});
    if (existingLike) return existingLike;

    const newLike = this.likeRepo.create({ cat_id, user });
    return await this.likeRepo.save(newLike);
  }

  async deleteLike(cat_id: string, user: User) {
    const like = await this.likeRepo.findOne({ where: { cat_id, user } });
    if (!like) throw new NotFoundException('Лайк не найден.');

    return this.likeRepo.remove(like);
  }
}
