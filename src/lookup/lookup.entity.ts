import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lookup')
export class LookupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

}
