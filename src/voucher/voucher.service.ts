import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { User } from 'src/auth/user.interface';
import { PatientEntity } from 'src/patient/patient.entity';
import { ProffesionalEntity } from 'src/users/professional.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VoucherEntity } from './entities/voucher.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(VoucherEntity)
    private readonly voucherRepo: Repository<VoucherEntity>,
    @InjectRepository(ProffesionalEntity)
    private readonly professionalRepo: Repository<ProffesionalEntity>,
  ) {}
  create(createVoucherDto: CreateVoucherDto): Promise<CreateVoucherDto> {
    return this.voucherRepo.save(createVoucherDto);
  }

  findAll(): Promise<CreateVoucherDto[]> {
    return this.voucherRepo.find();
  }

  async findToFill(amount: number, user: User): Promise<CreateVoucherDto> {
    const voucher = await this.voucherRepo.findOne({
      where: {
        amount,
        status: 'NotFilled',
      },
    });
    this.voucherRepo.update(voucher.id, {
      status: 'Filled',
    });
    const profession_id = user.profession[0].id;
    const professional = await this.professionalRepo.findOne(profession_id);

    const newPoint = Number(professional.points) - amount;
    this.professionalRepo.update(profession_id, {
      points: newPoint.toString(),
    });
    return voucher;
  }

  findOne(id: number): Promise<CreateVoucherDto> {
    return this.voucherRepo.findOne(id);
  }

  update(
    id: number,
    updateVoucherDto: UpdateVoucherDto,
  ): Promise<UpdateResult> {
    return this.voucherRepo.update(id, updateVoucherDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.voucherRepo.delete({
      id,
    });
  }
}
