import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/auth/role.interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { RolesService } from '../service/roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @Get()
  getPosts(): Observable<Role[]> {
    return this.roleService.findAll();
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() role: Role,
  ): Observable<UpdateResult> {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.roleService.delete(id);
  }
}
