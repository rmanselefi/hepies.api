import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('points')
export class PointsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  point: string;

  @Column()
  when: string;

  @Column()
  to: string;
}
