import { Module } from '@nestjs/common';
import { PrescriptionService } from './service/prescription.service';
import { PrescriptionController } from './controller/prescription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './prescription.entity';
import { HxEntity } from './hx.entity';
import { PxEntity } from './px.entity';
import { PatientEntity } from '../patient/patient.entity';
import { InvestigationEntity } from './entities/investigation.entity';
import { DrugEntity } from '../drugs/drugs.entity';
import { DrugsModule } from '../drugs/drugs.module';
import { DxEntity } from './entities/dx.entity';
import { ProffesionalEntity } from '../users/professional.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrescriptionEntity,
      PatientEntity,
      HxEntity,
      PxEntity,
      InvestigationEntity,
      DrugEntity,
      DxEntity,
      ProffesionalEntity,
    ]),
    DrugsModule,
  ],
  providers: [PrescriptionService],
  controllers: [PrescriptionController],
})
export class PrescriptionModule {}
