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
    const { name, fathername, grandfathername, age, weight, sex, phone } =
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
      }),
    );
  }

  findAllPatients(): Observable<PatientEntity[]> {
    return from(
      this.patientRepo.find({
        relations: ['ix', 'hx', 'px', 'dx'],
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

  findPatient(phone: string): Observable<PatientEntity[]> {
    return from(
      this.patientRepo.find({
        where: { phone },
        relations: ['prescription', 'hx', 'dx', 'px', 'ix'],
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
    const { name, fathername, grandfathername, age, weight, sex, phone } =
      patient;
    return from(
      this.patientRepo.update(id, {
        name,
        age,
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
