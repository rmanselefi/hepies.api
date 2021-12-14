/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DrugEntity } from '../drugs/drugs.entity';
import { PatientEntity } from '../patient/patient.entity';
import { PrescriptionItemEntity } from './entities/prescription_items.entity';

@Entity('prescription')
export class PrescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
  diagnosis: string;

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

  @OneToMany(() => PrescriptionItemEntity, (patientEntity) => patientEntity.prescription)
  item: PrescriptionItemEntity;
}
