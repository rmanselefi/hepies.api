import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';
import { PasswordResetEntity } from './passwordReset.entity';
import { PasswordResetController } from './controller/passwordReset.controller';
import { PasswordResetService } from './services/passwordReset.service';
import { ProffesionalEntity } from '../users/professional.entity';
import { MailService } from '../mail/services/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordResetEntity, UserEntity,ProffesionalEntity]),
  ],
  providers: [PasswordResetService,MailService],
  exports: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}
