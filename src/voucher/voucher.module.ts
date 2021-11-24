import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherEntity } from './entities/voucher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherEntity])],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
