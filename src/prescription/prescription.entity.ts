/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DrugEntity } from '../drugs/drugs.entity';
import { PatientEntity } from '../patient/patient.entity';

@Entity('prescription')
export class PrescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  drug_name: string;

  @Column({
    nullable: true,
  })
  strength: string;

  @Column({
    nullable: true,
  })
  unit: string;

  @Column({
    nullable: true,
  })
  route: string;

  @Column({
    nullable: true,
  })
  ampule: string;

  @Column({
    nullable: true,
  })
  takein: string;

  @Column({
    nullable: true,
  })
  frequency: string;

  @Column({
    nullable: true,
  })
  material_name: string;

  @Column({
    nullable: true,
  })
  size: string;

  @Column({
    nullable: true,
  })
  remark: string;

  @Column({
    nullable: true,
  })
  type: string;

  @Column({
    nullable: true,
  })
  professional: string;

  @Column({
    nullable: true,
  })
  professionalid: number;

  @CreateDateColumn()
  createdAt;

  @Column({
    nullable: true,
    default: 'NotRead',
  })
  status: string;

  @Column({
    nullable: true,
  })
  readby: string;

  @Column({
    nullable: true,
  })
  readbyid: number;

  @Column({
    nullable: true,
  })
  readDate: Date;

  @ManyToOne(() => DrugEntity, (drugEntity) => drugEntity.prescription, {
    cascade: true,
  })
  drug: DrugEntity;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.prescription)
  patient: PatientEntity;
}
