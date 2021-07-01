import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PatientEntity } from '../patient.entity';
import { Patient } from '../patient.interface';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepo: Repository<PatientEntity>,
  ) {}

  createPatient(patient: Patient): Observable<PatientEntity> {
    const { name, fathername, grandfathername, age, weight, sex, dx, phone } =
      patient;
    return from(
      this.patientRepo.save({
        name,
        fathername,
        grandfathername,
        phone,
        age,
        sex,
        weight,
        dx,
      }),
    );
  }

  findAllPatients(): Observable<PatientEntity[]> {
    return from(
      this.patientRepo.find({
        relations: ['ix', 'hx', 'px'],
      }),
    );
  }

  findDrug(id: number): Observable<PatientEntity[]> {
    return from(
      this.patientRepo.find({
        where: { id },
      }),
    );
  }

  //   async findDrugs(take = 10, skip = 0): Promise<Drug[]> {
  //     const drugs = this.drugRepo.findAndCount({
  //       take,
  //       skip,
  //     });
  //     return <Drug[]>drugs;
  //   }

  updatePatient(id: number, patient: Patient): Observable<UpdateResult> {
    const { name, fathername, grandfathername, age, weight, sex, dx, phone } =
      patient;
    return from(
      this.patientRepo.update(id, {
        name,
        age,
        dx,
        fathername,
        grandfathername,
        phone,
        sex,
        weight,
      }),
    );
  }

  deletePatient(id: number): Observable<DeleteResult> {
    return from(this.patientRepo.delete(id));
  }
}
