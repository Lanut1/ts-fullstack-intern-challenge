import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Like } from '../../like/entities/like.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @OneToMany(() => Like, like => like.user)
  likes: Like[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
