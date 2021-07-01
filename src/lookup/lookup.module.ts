import { Module } from '@nestjs/common';
import { LookupService } from './service/lookup.service';
import { LookupController } from './controller/lookup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupEntity } from './lookup.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LookupEntity])],
  providers: [LookupService],
  controllers: [LookupController]
})
export class LookupModule {}
