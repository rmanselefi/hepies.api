import { PatientEntity } from '../patient/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hx')
export class HxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cc: string;

  @Column()
  hpi: string;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.hx)
  patient: PatientEntity;
}
