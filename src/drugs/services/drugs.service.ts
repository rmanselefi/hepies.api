import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Drug } from '../drug.interface';
import { DrugEntity } from '../drugs.entity';

@Injectable()
export class DrugsService {
  constructor(
    @InjectRepository(DrugEntity)
    private readonly drugRepo: Repository<DrugEntity>,
  ) {}

  createDrug(drug: Drug): Observable<Drug> {
    return from(this.drugRepo.save(drug));
  }

  findAllDrugs(): Observable<Drug[]> {
    return from(this.drugRepo.find());
  }

  async findDrug(id: number): Promise<Drug[]> {
    return await this.drugRepo.find({
      where: { id },
    });
  }

  //   async findDrugs(take = 10, skip = 0): Promise<Drug[]> {
  //     const drugs = this.drugRepo.findAndCount({
  //       take,
  //       skip,
  //     });
  //     return <Drug[]>drugs;
  //   }

  updateDrug(id: number, drug: Drug): Observable<UpdateResult> {
    return from(this.drugRepo.update(id, drug));
  }

  deleteDrug(id: number): Observable<DeleteResult> {
    return from(this.drugRepo.delete(id));
  }
}
