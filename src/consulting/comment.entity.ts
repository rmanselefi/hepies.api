/* eslint-disable prettier/prettier */
import { UserEntity } from '../auth/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConsultingEntity } from './consulting.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string; 
  
  @Column({
    nullable: true,
  })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => ConsultingEntity, (feedPost) => feedPost.comment)
  consult: ConsultingEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comment)
  user: UserEntity;
}
