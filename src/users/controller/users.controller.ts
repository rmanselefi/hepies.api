import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../../auth/decorators/roles.decorators';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Role } from '../../auth/decorators/role.enum';
import { User } from '../../auth/user.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Proffesional } from '../professional.interface';
import { UsersService } from '../services/users.service';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  getAllUsers(): Observable<Proffesional[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: number): Promise<Proffesional> {
    return this.userService.findUserById(id);
  }

  @Post('register')
  register(@Body() user: Proffesional): Promise<Proffesional> {
    return this.userService.registerUser(user);
  }

  @Post('enable/:id')
  enableDisableUser(
    @Param('id') id: number,
    @Body() user: User,
  ): Observable<UpdateResult> {
    return this.userService.enableDisableUser(id, user.active);
  }

  @Put('update/:id')
  updateUser(
    @Param('id') id: number,
    @Body() user: Proffesional,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Put('profile/update/:id')
  updateProfile(
    @Param('id') id: number,
    @Body() user: Proffesional,
  ): Promise<UpdateResult> {
    return this.userService.updateUser(id, user);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }

  @Post('removepoint/:id')
  removePoint(
    @Param('id') id: number,
    @Body() user: Proffesional,
  ): Promise<UpdateResult> {
    return this.userService.removePoint(id, user.points);
  }

  @Post('rewardpoint/:id')
  rewardPoint(
    @Param('id') id: number,
    @Body() user: Proffesional,
  ): Promise<UpdateResult> {
    return this.userService.rewardPoint(id, user.points);
  }
}
