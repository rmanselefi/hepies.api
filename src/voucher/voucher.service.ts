import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { PatientEntity } from 'src/patient/patient.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VoucherEntity } from './entities/voucher.entity';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(VoucherEntity)
    private readonly voucherRepo: Repository<VoucherEntity>,
  ) {}
  create(createVoucherDto: CreateVoucherDto): Promise<CreateVoucherDto> {
    return this.voucherRepo.save(createVoucherDto);
  }

  findAll(): Promise<CreateVoucherDto[]> {
    return this.voucherRepo.find();
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
