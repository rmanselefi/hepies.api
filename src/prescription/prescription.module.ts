import { Module } from '@nestjs/common';
import { PrescriptionService } from './service/prescription.service';
import { PrescriptionController } from './controller/prescription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrescriptionEntity } from './prescription.entity';
import { HxEntity } from './hx.entity';
import { PxEntity } from './px.entity';
import { PatientEntity } from '../patient/patient.entity';
import { InvestigationEntity } from './entities/investigation.entity';
import { HemathologyEntity } from './entities/hemathology.entity';
import { ChemistryEntity } from './entities/chemistry.entity';
import { EndocrinologyEntity } from './entities/endocrinology.entity';
import { UrineEntity } from './entities/urine.entity';
import { SerologyEntity } from './entities/serology.entity';
import { DrugsService } from '../drugs/services/drugs.service';
import { DrugEntity } from '../drugs/drugs.entity';
import { DrugsModule } from '../drugs/drugs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PrescriptionEntity,
      PatientEntity,
      HxEntity,
      PxEntity,
      InvestigationEntity,
      HemathologyEntity,
      ChemistryEntity,
      EndocrinologyEntity,
      UrineEntity,
      SerologyEntity,
      DrugEntity,
    ]),
    DrugsModule,

  ],
  providers: [PrescriptionService],
  controllers: [PrescriptionController],
})
export class PrescriptionModule {}
