import 'express';
import { User } from 'src/user/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
