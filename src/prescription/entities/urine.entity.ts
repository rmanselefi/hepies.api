import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class UrineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  urinehcg: string;

  @Column()
  stoolexam: string;

  @Column()
  stooloccultblood: string;

  @Column()
  stoolplylori: string;

}
