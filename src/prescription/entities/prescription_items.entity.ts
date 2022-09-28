/* eslint-disable prettier/prettier */
import { DrugEntity } from '../../drugs/drugs.entity';
import { PatientEntity } from '../../patient/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrescriptionEntity } from '../prescription.entity';

@Entity('prescription_items')
export class PrescriptionItemEntity {
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
  amount: string;

  @Column({
    nullable: true,
    default: 'NotRead',
  })
  status: string;

  @Column({
    nullable: true,
  })
  readbyid: number;

  @Column({
    nullable: true,
  })
  readDate: Date;
  @Column({
    nullable: true,
  })
  readby: string;

  @CreateDateColumn()
  createdAt;

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

  @ManyToOne(() => PrescriptionEntity, (patientEntity) => patientEntity.item, {
    cascade: true,
  })
  prescription: PrescriptionEntity;

  @ManyToOne(
    () => PatientEntity,
    (patientEntity) => patientEntity.prescription_item,
  )
  patient: PatientEntity;

  @ManyToOne(() => DrugEntity, (drugEntity) => drugEntity.prescription_item, {
    cascade: true,
  })
  drug: DrugEntity;
}
