import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmacyController } from './controller/pharmacy.controller';
import { PharmacyDrugsEntity } from './pharmacy.entity';
import { PharmacyService } from './service/pharmacy.service';

@Module({
  imports: [TypeOrmModule.forFeature([PharmacyDrugsEntity])],
  controllers: [PharmacyController],
  providers: [PharmacyService],
})
export class PharmacyModule {}
