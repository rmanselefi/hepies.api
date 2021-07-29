import { PatientEntity } from '../patient/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.hx)
  patient: PatientEntity;
}
