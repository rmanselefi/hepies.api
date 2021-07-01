import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DrugEntity } from '../drugs/drugs.entity';
import { PatientEntity } from '../patient/patient.entity';

@Entity('prescription')
export class PrescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  dose: string;

  @Column()
  route: string;

  @Column()
  takein: string;

  @Column()
  frequency: string;

  @ManyToOne(() => DrugEntity, (drugEntity) => drugEntity.prescription)
  drug: DrugEntity;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.prescription)
  patient: PatientEntity;
}
