import { CommentEntity } from '../consulting/comment.entity';
import {
  Column,
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
  })
  active: string;

  @Column({
    nullable: true,
  })
  isFit: string;

  @ManyToOne(() => RoleEntity, (role) => role.user)
  role: RoleEntity;

  @OneToMany(() => ConsultingEntity, (feedPost) => feedPost.author)
  consult: ConsultingEntity;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.user)
  comment: CommentEntity;

  @OneToMany(() => ProffesionalEntity, (profession) => profession.user)
  profession: ProffesionalEntity;
}
