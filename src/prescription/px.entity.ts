import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PatientEntity } from '../patient/patient.entity';

@Entity('px')
export class PxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ga: string;

  @Column()
  pr: string;

  @Column()
  rr: string;

  @Column()
  bp: string;

  @Column()
  temp: string;

  @Column()
  heent: string;

  @Column()
  lgs: string;

  @Column()
  rs: string;

  @Column()
  cvs: string;

  @Column()
  abd: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.px)
  patient: PatientEntity;
}
