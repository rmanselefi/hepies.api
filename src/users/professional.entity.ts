/* eslint-disable prettier/prettier */
import { PharmacyDrugsEntity } from '../pharmacy/pharmacy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @Column({
    nullable: true,
  })
  grandfathername: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  proffesion: string;

  @Column({
    nullable: true,
    default: '0',
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
  dob: string;

  @Column({
    nullable: true,
  })
  sex: string;

  @Column({
    nullable: true,
  })
  interests: string;

  @CreateDateColumn()
  createdAt;

  @ManyToOne(() => UserEntity, (user) => user.profession)
  user: UserEntity;

  @OneToMany(() => PharmacyDrugsEntity, (pharmacy) => pharmacy.profession)
  pharmacy: PharmacyDrugsEntity;
}
