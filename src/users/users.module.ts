import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controller/users.controller';
import { ProffesionalEntity } from './professional.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../auth/user.entity';
import { RoleEntity } from '../auth/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProffesionalEntity, UserEntity, RoleEntity]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
