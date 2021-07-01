import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('serology')
export class SerologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  widal: string;

  @Column()
  welfelix: string;

  @Column()
  HBsAg: string;

  @Column()
  HIVmedical: string;

  @Column()
  HIVviralload: string;

  @Column()
  CD4count: string;

  @Column()
  aso: string;

  @Column()
  rf: string;

  @Column()
  crp: string;

  @Column()
  ana: string;

  @Column()
  betahcg: string;

  @Column()
  coombs: string;

}
