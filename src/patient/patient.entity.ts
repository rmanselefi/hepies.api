/* eslint-disable prettier/prettier */
import { InvestigationEntity } from '../prescription/entities/investigation.entity';
import { HxEntity } from '../prescription/hx.entity';
import { PxEntity } from '..//prescription/px.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { PrescriptionEntity } from '../prescription/prescription.entity';
import { DxEntity } from '../prescription/entities/dx.entity';
import { PrescriptionItemEntity } from '../prescription/entities/prescription_items.entity';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fathername: string;

  @Column()
  grandfathername: string;

  @Column({
    unique: true,
  })
  phone: string;

  @Column()
  age: string;

  @Column({
    nullable: true,
  })
  age_label: string;

  @Column()
  sex: string;

  @Column()
  weight: string;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  mrn: string;

  @CreateDateColumn()
  createdAt;

  @OneToMany(() => HxEntity, (hxEntity) => hxEntity.patient)
  hx?: HxEntity[];

  @OneToMany(() => DxEntity, (hxEntity) => hxEntity.patient)
  dx?: DxEntity[];

  @OneToMany(() => PxEntity, (pxEntity) => pxEntity.patient)
  px?: PxEntity[];

  @OneToMany(() => InvestigationEntity, (ix) => ix.patient)
  ix?: InvestigationEntity[];

  @OneToMany(
    () => PrescriptionEntity,
    (prescriptionEntity) => prescriptionEntity.patient,
  )
  prescription?: PrescriptionEntity[];

  @OneToMany(
    () => PrescriptionItemEntity,
    (prescriptionEntity) => prescriptionEntity.patient,
  )
  prescription_item?: PrescriptionItemEntity[];
}
