/* eslint-disable prettier/prettier */
import { PatientEntity } from '../../patient/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('investigation')
export class InvestigationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable:true
  })
  microbiology: string;

  @Column({
    nullable:true
  })
  pathologyindex: string;

  @Column({
    nullable:true
  })
  radiologyindex: string;

  @Column({
    nullable:true
  })
  others: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  hehemathology;

  @Column({
    type: 'json',
    nullable: true,
  })
  chemistry;

  @Column({
    type: 'json',
    nullable: true,
  })
  serology;

  @Column({
    type: 'json',
    nullable: true,
  })
  endocrinology;

  @Column({
    type: 'json',
    nullable: true,
  })
  urine;

  @CreateDateColumn()
  createdAt;

  @ManyToOne(
    () => PatientEntity,
    (prescriptionEntity) => prescriptionEntity.ix,
    {
      cascade: true,
    },
  )
  patient?: PatientEntity;
}
