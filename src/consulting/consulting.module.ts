import { Module } from '@nestjs/common';
import { ConsultingService } from './service/consulting.service';
import { ConsultingController } from './controller/consulting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultingEntity } from './consulting.entity';
import { CommentEntity } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultingEntity, CommentEntity])],
  controllers: [ConsultingController],
  providers: [ConsultingService],
})
export class ConsultingModule {}
