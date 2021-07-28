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
  strength: string;

  @Column()
  unit: string;

  @Column()
  route: string;

  @Column({
    nullable: true,
  })
  ampule: string;

  @Column({
    nullable: true,
  })
  takein: string;

  @Column({
    nullable: true,
  })
  frequency: string;

  @Column()
  remark: string;

  @ManyToOne(() => DrugEntity, (drugEntity) => drugEntity.prescription)
  drug: DrugEntity;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.prescription)
  patient: PatientEntity;
}
