import { PatientEntity } from '../../patient/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('investigation')
export class InvestigationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  microbiology: string;

  @Column()
  pathologyindex: string;

  @Column()
  radiologyindex: string;

  @Column()
  others: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  hehemathology;

  @Column({
    type: 'json',
    nullable: true,
  })
  chemistry;

  @Column({
    type: 'json',
    nullable: true,
  })
  serology;

  @Column({
    type: 'json',
    nullable: true,
  })
  endocrinology;

  @Column({
    type: 'json',
    nullable: true,
  })
  urine;

  @ManyToOne(() => PatientEntity, (prescriptionEntity) => prescriptionEntity.ix)
  patient?: PatientEntity;
}
