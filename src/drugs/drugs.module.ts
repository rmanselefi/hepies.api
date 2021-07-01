import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugsController } from './controller/drugs.controller';
import { DrugEntity } from './drugs.entity';
import { DrugsService } from './services/drugs.service';

@Module({
  imports: [TypeOrmModule.forFeature([DrugEntity])],
  controllers: [DrugsController],
  providers: [DrugsService],
  exports: [DrugsService],
})
export class DrugsModule {}
