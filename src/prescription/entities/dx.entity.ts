import { PatientEntity } from '../../patient/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dx')
export class DxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  diagnosis: string;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.dx)
  patient: PatientEntity;
}
