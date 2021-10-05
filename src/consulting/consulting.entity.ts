/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';

@Entity('consults')
export class ConsultingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  topic: string;

  @Column({
    nullable: true,
  })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  user: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.consult)
  author: UserEntity;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.consult)
  comment: CommentEntity[];

  @OneToMany(() => LikeEntity, (likeEntity) => likeEntity.consult)
  like: LikeEntity[];
}
