import { InvestigationEntity } from '../prescription/entities/investigation.entity';
import { HxEntity } from '../prescription/hx.entity';
import { PxEntity } from '..//prescription/px.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrescriptionEntity } from '../prescription/prescription.entity';

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

  @Column()
  sex: string;

  @Column()
  weight: string;

  @Column()
  code: string;

  @Column()
  dx: string;

  @OneToMany(() => HxEntity, (hxEntity) => hxEntity.patient)
  hx?: HxEntity[];

  @OneToMany(() => PxEntity, (pxEntity) => pxEntity.patient)
  px?: PxEntity[];

  @ManyToOne(() => InvestigationEntity, (ix) => ix.patient)
  ix: InvestigationEntity;

  @OneToMany(
    () => PrescriptionEntity,
    (prescriptionEntity) => prescriptionEntity.patient,
  )
  prescription?: PrescriptionEntity[];
}
