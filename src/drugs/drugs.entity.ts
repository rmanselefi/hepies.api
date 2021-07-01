import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PrescriptionEntity } from '../prescription/prescription.entity';

@Entity('drugs')
export class DrugEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  strength: string;

  @Column()
  unit: string;

  @Column()
  category: string;

  @Column({
    length: '1000', 
  })
  description: string;

  @OneToMany(() => PrescriptionEntity, (presEntity) => presEntity.drug)
  prescription?: PrescriptionEntity[];
}
