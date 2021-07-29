import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DrugEntity } from '../drugs/drugs.entity';
import { PatientEntity } from '../patient/patient.entity';

@Entity('prescription')
export class PrescriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  strength: string;

  @Column({
    nullable: true,
  })
  unit: string;

  @Column({
    nullable: true,
  })
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

  @Column({
    nullable: true,
  })
  material_name: string;

  @Column({
    nullable: true,
  })
  size: string;

  @Column({
    nullable: true,
  })
  remark: string;

  @Column({
    nullable: true,
  })
  type: string;

  @ManyToOne(() => DrugEntity, (drugEntity) => drugEntity.prescription)
  drug: DrugEntity;

  @ManyToOne(() => PatientEntity, (patientEntity) => patientEntity.prescription)
  patient: PatientEntity;
}
