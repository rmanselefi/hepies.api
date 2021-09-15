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
    @InjectRepository(PrescriptionEntity)
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

  async getPatientById(id: number): Promise<PatientEntity> {
    return await this.patientRepo.findOne({
      where: { id },
      relations: ['ix', 'px', 'dx', 'hx'],
    });
  }

  async getPatient(phone: string): Promise<PatientEntity> {
    const patient = await this.patientRepo.findOne({
      where: { phone },
    });
    return patient;
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
      .select('MAX(prescription.id),prescription.code', 'code')
      .where('prescription.patientId = :id', { id: patient_id })
      .groupBy('prescription.code')
      .orderBy('prescription.createdAt','DESC')
      .execute();

    const last_pres = [];
    for (let i = 0; i < pres.length; i++) {
      const prescription = await this.presRepo.findOne({
        where: {
          code: pres[i].code,
        },
        relations: ['patient', 'drug'],
      });
      last_pres.push(prescription);
    }

    return last_pres;
  }

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
