import { Module } from '@nestjs/common';
import { GuidelinesService } from './guidelines.service';
import { GuidelinesController } from './guidelines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuidelinesEntity } from './entities/guideline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GuidelinesEntity])],
  controllers: [GuidelinesController],
  providers: [GuidelinesService]
})
export class GuidelinesModule {}
