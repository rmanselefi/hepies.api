import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PatientEntity } from '../patient/patient.entity';

@Entity('px')
export class PxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable:true
  })
  ga: string;

  @Column({
    nullable:true
  })
  pr: string;

  @Column({
    nullable:true
  })
  rr: string;

  @Column({
    nullable:true
  })
  bp: string;

  @Column({
    nullable:true
  })
  temp: string;

  @Column({
    nullable:true
  })
  heent: string;

  @Column({
    nullable:true
  })
  lgs: string;

  @Column({
    nullable:true
  })
  rs: string;

  @Column({
    nullable:true
  })
  cvs: string;

  @Column({
    nullable:true
  })
  abd: string;

  
  @CreateDateColumn()
  createdAt;

  @ManyToOne(() => PatientEntity, (patient) => patient.px)
  patient: PatientEntity;
}
