import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cat_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.likes, { nullable: false })
  user: User;
}
