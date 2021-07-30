import { PatientEntity } from '../../patient/patient.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dx')
export class DxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  diagnosis: string;

  
  @CreateDateColumn()
  createdAt;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.dx)
  patient: PatientEntity;
}
