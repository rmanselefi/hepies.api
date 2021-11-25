/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('voucher')
export class VoucherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: string;

  @Column()
  code: string;

  @Column({ 
    default: "NotGiven"
  })
  status: string;

  @Column({
    nullable: true,
  })
  filledby: string;

 
}
