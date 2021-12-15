/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrescriptionEntity } from '../prescription.entity';

@Entity('prescription_items')
export class PrescriptionItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    nullable: true,
  })
  drug_name: string;

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

  @CreateDateColumn()
  createdAt;

  @ManyToOne(() => PrescriptionEntity, (patientEntity) => patientEntity.item, {
    cascade: true,
  })
  prescription: PrescriptionEntity;
}