/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConsultingService } from './service/consulting.service';
import { ConsultingController } from './controller/consulting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultingEntity } from './consulting.entity';
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';
import { InterestEntity } from './interests.entity';
import { LikeCommentEntity } from './like_comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultingEntity, CommentEntity, LikeEntity, InterestEntity,LikeCommentEntity]),
  ],
  controllers: [ConsultingController],
  providers: [ConsultingService],
})
export class ConsultingModule {}
