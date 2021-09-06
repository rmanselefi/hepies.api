/* eslint-disable prettier/prettier */
import { DrugEntity } from '../drugs/drugs.entity';
import { ProffesionalEntity } from '../users/professional.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('pharmacy_drugs')
export class PharmacyDrugsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  drug_name: string;

  @ManyToOne(() => DrugEntity, (profession) => profession.pharmacy)
  drug: DrugEntity;

  @ManyToOne(() => ProffesionalEntity, (profession) => profession.pharmacy)
  profession: ProffesionalEntity;
}
