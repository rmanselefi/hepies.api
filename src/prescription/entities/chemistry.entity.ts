import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('chemistry')
export class ChemistryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fbs: string;

  @Column()
  rbs: string;

  @Column()
  hba1c: string;

  @Column()
  bunurea: string;

  @Column()
  astsgot: string;

  @Column()
  altsgpt: string;

  @Column()
  alp: string;

  @Column()
  albumin: string;

  @Column()
  protein: string;

  @Column()
  triglyceride: string;

  @Column()
  cholesterol: string;

  @Column()
  hdl: string;

  @Column()
  ldl: string;

  @Column()
  amylase: string;

  @Column()
  lipase: string;

  @Column()
  sodium: string;

  @Column()
  potassium: string;

  @Column()
  calcium: string;

  @Column()
  calciumionized: string;

  @Column()
  phosphorous: string;

  @Column()
  chloride: string;

  @Column()
  magnesium: string;

  @Column()
  TIBC: string;

  @Column()
  iron: string;

  @Column()
  transferrinsaturation: string;

  @Column()
  ferritin: string;

  @Column()
  serumfolate: string;
 
}
