// Ficar esperto com a nomeclatura do arquivo. O TypeORM precisa do .entity iy .repository
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // Pra não devolver o usuário inteiro pro front
  @Exclude({ toPlainOnly: true })
  user: User;
}
