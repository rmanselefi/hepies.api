/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { PrescriptionEntity } from '../../prescription/prescription.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PatientEntity } from '../patient.entity';
import { Patient } from '../patient.interface';
import { getConnection } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepo: Repository<PatientEntity>,
    @InjectRepository(PatientEntity)
    private readonly presRepo: Repository<PrescriptionEntity>,
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

  async findPatient(phone: string): Promise<any[]> {
    const patient = await this.patientRepo.findOne({
      where: { phone },
    });
    const patient_id = patient.id;
    const patint = {
      id: patient_id,
    };
    const pres = await getConnection()
      .getRepository(PrescriptionEntity)
      .createQueryBuilder('prescription')
      .select("MAX(prescription.id)", "max")
      .select("prescription.code")
      .where('prescription.patientId = :id', { id: patient_id })
      .groupBy('prescription.code')
      .execute();
    console.log('====================================');
    console.log(pres);
    console.log('====================================');
    const prescription = await this.presRepo.find({
      where: { patientId: patint },
    });
    return prescription;
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
