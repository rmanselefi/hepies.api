import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PharmacyDrugsEntity } from '../pharmacy.entity';
import { Pharmacy } from '../pharmacy.interface';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectRepository(PharmacyDrugsEntity)
    private readonly lookupRepo: Repository<PharmacyDrugsEntity>,
  ) {}

  create(pharmacy_drugs: Pharmacy): Observable<Pharmacy> {
    const { drug_name, drug, professional } = pharmacy_drugs;

    return from(
      this.lookupRepo.save({
        drug,
        drug_name,
        professional,
      }),
    );
  }

  findAll(): Observable<PharmacyDrugsEntity[]> {
    return from(this.lookupRepo.find());
  }

  find(id: number): Observable<PharmacyDrugsEntity[]> {
    return from(
      this.lookupRepo.find({
        where: { id },
      }),
    );
  }

  update(id: number, patient: Pharmacy): Observable<UpdateResult> {
    return from(this.lookupRepo.update(id, patient));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.lookupRepo.delete(id));
  }
}
