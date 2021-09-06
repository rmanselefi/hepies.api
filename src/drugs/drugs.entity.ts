/* eslint-disable prettier/prettier */
import { PharmacyDrugsEntity } from '../pharmacy/pharmacy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrescriptionEntity } from '../prescription/prescription.entity';

@Entity('drugs')
export class DrugEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

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
  category: string;

  @Column({
    nullable: true,
  })
  route: string;

  @Column({
    length: '10000',
    nullable: true,
  })
  about: string;

  @OneToMany(() => PrescriptionEntity, (presEntity) => presEntity.drug)
  prescription?: PrescriptionEntity[];

  @OneToMany(() => PharmacyDrugsEntity, (pharmacy) => pharmacy.drug)
  pharmacy?: PharmacyDrugsEntity[];
}
