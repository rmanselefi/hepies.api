import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsController } from './controller/points.controller';
import { PointsEntity } from './points.entity';
import { PointsService } from './service/points.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointsEntity])],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
