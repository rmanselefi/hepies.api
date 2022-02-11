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
import { CommentEntity } from './comment.entity';

@Entity('likes')
export class LikeCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  user_id: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.like)
  comment: CommentEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comment)
  user: UserEntity;
}
