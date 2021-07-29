import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class EndocrinologyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  t3: string;

  @Column()
  t4: string;

  @Column()
  pth: string;

  @Column()
  tsh: string;

  @Column()
  fsh: string;

  @Column()
  lh: string;

  @Column()
  progesterone: string;

  @Column()
  estradiol: string;

  @Column()
  testosterone: string;

  @Column()
  prolactin: string;

  @Column()
  serumcortisol: string;

  @Column()
  serumcalcitonin: string;

  @Column()
  erythropoietin: string;

  @Column()
  growthhormone: string;

  @Column()
  vitb12: string;

  @Column()
  vitD: string;

}
