/* eslint-disable prettier/prettier */
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
    return from(
      this.drugRepo.find({
        order: {
          name: 'ASC',
        },
      }),
    );
  }

  getInstrument(): Observable<Drug[]> {
    return from(
      this.drugRepo.find({
        where: {
          type: 'instrument',
        },
        order: {
          name: 'ASC',
        },
      }),
    );
  }

  getGeneral(): Observable<Drug[]> {
    return from(
      this.drugRepo.find({
        where: {
          type: 'general',
        },
        order: {
          name: 'ASC',
        },
      }),
    );
  }


  getPsychotic(): Observable<Drug[]> {
    return from(
      this.drugRepo.find({
        where: {
          type: 'psychotropic',
        },
        order: {
          name: 'ASC',
        },
      }),
    );
  }

  getNarcotics(): Observable<Drug[]> {
    return from(
      this.drugRepo.find({
        where: {
          type: 'narcotics',
        },
        order: {
          name: 'ASC',
        },
      }),
    );
  }

  async findDrug(id: number): Promise<Drug[]> {
    return await this.drugRepo.find({
      where: { id },
    });
  }

  async findDrugByType(type: string): Promise<Drug[]> {
    return await this.drugRepo.find({
      where: { type },
    });
  }

  async findDrugByName(name: string): Promise<Drug[]> {
    return await this.drugRepo.find({
      where: { name },
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
