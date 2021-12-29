/* eslint-disable prettier/prettier */
import { UserEntity } from '../auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConsultingEntity } from './consulting.entity';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  user_id: number;

  @ManyToOne(() => ConsultingEntity, (feedPost) => feedPost.like)
  consult: ConsultingEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comment)
  user: UserEntity;
}
