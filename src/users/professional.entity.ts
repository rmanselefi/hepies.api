import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../auth/user.entity';

@Entity('proffesional')
export class ProffesionalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fathername: string;

  @Column()
  grandfathername: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  proffesion: string;

  @Column({
    nullable: true,
  })
  points: string;

  @Column({
    nullable: true,
  })
  license: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  profile: string;

  @Column({
    nullable: true,
  })
  speciality: string;

  @Column({
    nullable: true,
  })
  workplace: string;

  @Column({
    nullable: true,
  })
  interests: string;

  @ManyToOne(() => UserEntity, (user) => user.profession)
  user: UserEntity;
}
