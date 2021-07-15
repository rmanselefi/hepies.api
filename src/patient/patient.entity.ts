import { InvestigationEntity } from '../prescription/entities/investigation.entity';
import { HxEntity } from '../prescription/hx.entity';
import { PxEntity } from '..//prescription/px.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrescriptionEntity } from '../prescription/prescription.entity';
import { DxEntity } from '../prescription/entities/dx.entity';

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
}
