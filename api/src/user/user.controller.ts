import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async authenticate(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response
  ) {
    try {
      const { user } = await this.userService.authenticate(loginUserDto);

      res.header('X-Auth-Token', user.token);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message || 'Внутренняя ошибка сервера'
      })
    }
  }
}
