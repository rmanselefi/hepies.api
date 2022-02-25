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
    private readonly pharmacyRepo: Repository<PharmacyDrugsEntity>,
  ) {}

  create(pharmacy_drugs: Pharmacy): Observable<PharmacyDrugsEntity> {
    console.log(pharmacy_drugs);

    const { drug_name, drug, profession, price } = pharmacy_drugs;

    return from(
      this.pharmacyRepo.save({
        drug,
        price,
        drug_name,
        profession: profession,
      }),
    );
  }

  findAll(): Observable<PharmacyDrugsEntity[]> {
    return from(
      this.pharmacyRepo.find({
        relations: ['drug', 'profession'],
      }),
    );
  }

  find(id: number): Observable<PharmacyDrugsEntity[]> {
    return from(
      this.pharmacyRepo.find({
        where: { profession: id },
      }),
    );
  }

  update(id: number, pharmacy: Pharmacy): Observable<UpdateResult> {
    return from(this.pharmacyRepo.update(id, pharmacy));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.pharmacyRepo.delete(id));
  }
}
