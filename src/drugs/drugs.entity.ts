/* eslint-disable prettier/prettier */
import { PharmacyDrugsEntity } from '../pharmacy/pharmacy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrescriptionEntity } from '../prescription/prescription.entity';
import { PrescriptionItemEntity } from 'src/prescription/entities/prescription_items.entity';

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
    nullable: true,
    default: 0,
  })
  number_prescription: number;

  @Column({
    nullable: true,
    default: false,
  })
  prescribed: boolean;

  @Column({
    length: '10000',
    nullable: true,
  })
  about: string;

  @Column({
    nullable: true,
  })
  type: string;

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
  how_many: string;

  @OneToMany(() => PrescriptionEntity, (presEntity) => presEntity.drug)
  prescription?: PrescriptionEntity[];

  @OneToMany(() => PrescriptionItemEntity, (presEntity) => presEntity.drug)
  prescription_item?: PrescriptionItemEntity[];

  @OneToMany(() => PharmacyDrugsEntity, (pharmacy) => pharmacy.drug)
  pharmacy?: PharmacyDrugsEntity[];
}
