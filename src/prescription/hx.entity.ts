import { PatientEntity } from '../patient/patient.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hx')
export class HxEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable:true
  })
  cc: string;

  @Column({
    nullable:true
  })
  hpi: string;

  
  @CreateDateColumn()
  createdAt;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.hx)
  patient: PatientEntity;
}
