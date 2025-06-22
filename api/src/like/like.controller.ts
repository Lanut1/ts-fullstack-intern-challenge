import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '../user/auth.guard';
import { Request } from 'express';

@Controller('likes')
@UseGuards(AuthGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  async getUserLikes(@Req() req: Request) {
    const likes = await this.likeService.getLikesByUser(req.user);
    return { data: likes };
  }

  @Post()
  async addLike(@Body('cat_id') cat_id: string, @Req() req: Request) {
    const like = await this.likeService.addLike(cat_id, req.user);
    return { data: like };
  }

  @Delete(':cat_id')
  @HttpCode(HttpStatus.OK)
  async removeLike(@Param('cat_id') cat_id: string, @Req() req: Request) {
    await this.likeService.deleteLike(cat_id, req.user);
    return { message: 'Лайк удалён.' };
  }
}
