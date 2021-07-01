import { PatientEntity } from '../../patient/patient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ChemistryEntity } from './chemistry.entity';
import { EndocrinologyEntity } from './endocrinology.entity';
import { HemathologyEntity } from './hemathology.entity';
import { SerologyEntity } from './serology.entity';
import { UrineEntity } from './urine.entity';

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

  @OneToOne(() => HemathologyEntity)
  @JoinColumn()
  hemathology?: HemathologyEntity[];

  @OneToOne(() => ChemistryEntity)
  @JoinColumn()
  chemistry?: ChemistryEntity[];

  @OneToOne(() => SerologyEntity)
  @JoinColumn()
  serology?: SerologyEntity[];

  @OneToOne(() => EndocrinologyEntity)
  @JoinColumn()
  endocrinology?: EndocrinologyEntity[];

  @OneToOne(() => UrineEntity)
  @JoinColumn()
  urine?: UrineEntity[];

  @OneToMany(() => PatientEntity, (prescriptionEntity) => prescriptionEntity.ix)
  patient?: PatientEntity;
}
