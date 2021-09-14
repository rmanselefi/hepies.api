/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from '../prescription/prescription.entity';
import { PatientController } from './controller/patient.controller';
import { PatientEntity } from './patient.entity';
import { PatientService } from './service/patient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientEntity]),
    TypeOrmModule.forFeature([PrescriptionEntity]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
