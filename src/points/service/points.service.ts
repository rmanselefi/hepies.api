import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PointsEntity } from '../points.entity';
import { Points } from '../points.interface';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(PointsEntity)
    private readonly pointsRepo: Repository<PointsEntity>,
  ) {}

  createPoint(patient: Points): Observable<Points> {
    return from(this.pointsRepo.save(patient));
  }

  findAllPoints(): Observable<Points[]> {
    return from(this.pointsRepo.find());
  }

  findPoint(id: number): Observable<Points[]> {
    return from(
      this.pointsRepo.find({
        where: { id },
      }),
    );
  }

  updatePoint(id: number, patient: Points): Observable<UpdateResult> {
    return from(this.pointsRepo.update(id, patient));
  }

  deletePoint(id: number): Observable<DeleteResult> {
    return from(this.pointsRepo.delete(id));
  }
}
