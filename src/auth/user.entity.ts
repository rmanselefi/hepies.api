/* eslint-disable prettier/prettier */
import { CommentEntity } from '../consulting/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConsultingEntity } from '../consulting/consulting.entity';
import { RoleEntity } from './role.entity';
import { ProffesionalEntity } from '../users/professional.entity';
import { LikeEntity } from '../consulting/like.entity';
// import { NotificationEntity } from '../notification/entities/notification.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: 'false',
  })
  active: string;

  @Column({
    nullable: true,
    default: 'false',
  })
  isFit: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.user)
  role: RoleEntity;

  @OneToMany(() => ConsultingEntity, (feedPost) => feedPost.author)
  consult: ConsultingEntity;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.user)
  comment: CommentEntity;

  @OneToMany(() => ProffesionalEntity, (profession) => profession.user)
  profession: ProffesionalEntity;

  // @OneToMany(() => NotificationEntity, (notification) => notification.user)
  // notification: NotificationEntity;

  @OneToMany(() => LikeEntity, (likeEntity) => likeEntity.user)
  like: LikeEntity[];
}
