import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { RoleEntity } from '../../auth/role.entity';
import { Role } from '../../auth/role.interface';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  create(role: Role): Observable<Role> {
    return from(this.roleRepo.save(role));
  }

  findAll(): Observable<Role[]> {
    return from(this.roleRepo.find());
  }

  find(id: number): Observable<Role[]> {
    return from(
      this.roleRepo.find({
        where: { id },
      }),
    );
  }

  update(id: number, role: Role): Observable<UpdateResult> {
    return from(this.roleRepo.update(id, role));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.roleRepo.delete(id));
  }
}
