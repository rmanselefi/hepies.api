import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { LookupEntity } from '../lookup.entity';
import { Lookup } from '../lookup.interface';

@Injectable()
export class LookupService {
  constructor(
    @InjectRepository(LookupEntity)
    private readonly lookupRepo: Repository<LookupEntity>,
  ) {}

  create(patient: Lookup): Observable<Lookup> {
    return from(this.lookupRepo.save(patient));
  }

  findAll(): Observable<Lookup[]> {
    return from(this.lookupRepo.find());
  }

  find(id: number): Observable<Lookup[]> {
    return from(
      this.lookupRepo.find({
        where: { id },
      }),
    );
  }

  update(id: number, patient: Lookup): Observable<UpdateResult> {
    return from(this.lookupRepo.update(id, patient));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.lookupRepo.delete(id));
  }
}
