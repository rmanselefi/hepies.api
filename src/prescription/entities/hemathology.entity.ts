import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class HemathologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wbccount: string;

  @Column()
  hct: string;

  @Column()
  mcv: string;

  @Column()
  mch: string;

  @Column()
  mchc: string;

  @Column()
  pltcount: string;

  @Column()
  reticulocyte: string;

  @Column()
  bgrh: string;

  @Column()
  esr: string;
}
