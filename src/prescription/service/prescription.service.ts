/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { PatientEntity } from '../../patient/patient.entity';
import { Repository } from 'typeorm';
import { HxEntity } from '../hx.entity';
import { Prescription } from '../models/prescription.interface';
import { PrescriptionEntity } from '../prescription.entity';
import { PxEntity } from '../px.entity';
import * as crypto from 'crypto';
import { InvestigationEntity } from '../entities/investigation.entity';
import { DrugsService } from '../../drugs/services/drugs.service';
import { Drug } from '../../drugs/drug.interface';
import { DxEntity } from '../entities/dx.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepo: Repository<PrescriptionEntity>,

    @InjectRepository(PatientEntity)
    private readonly patientRepo: Repository<PatientEntity>,

    @InjectRepository(HxEntity)
    private readonly hxRepo: Repository<HxEntity>,
    @InjectRepository(PxEntity)
    private readonly pxRepo: Repository<PxEntity>,

    @InjectRepository(DxEntity)
    private readonly dxRepo: Repository<DxEntity>,

    @InjectRepository(InvestigationEntity)
    private readonly investigationRepo: Repository<InvestigationEntity>,

    private drugService: DrugsService,
  ) {}

  async registerPrescription(
    prescription: Prescription,
    code: string,
  ): Promise<PrescriptionEntity> {
    const {
      drug,
      frequency,
      route,
      takein,
      ampule,
      unit,
      strength,
      remark,
      material_name,
      size,
      type,
      professional,
      drug_name,
    } = prescription;
    const {
      age,
      fathername,
      grandfathername,
      name,
      phone,
      sex,
      weight,
      hx,
      dx,
      px,
    } = prescription.patient;
    const { cc, hpi } = hx;
    const { diagnosis } = dx;
    const { abd, bp, cvs, ga, heent, lgs, pr, rr, rs, temp } = px;

    const patient_cod = await crypto.randomBytes(4).toString('hex');

    const patient_code = 'PATIENT' + patient_cod;
    const patient_find = await this.findPatient(phone);
    let patient;

    if (patient_find == null) {
      patient = await this.patientRepo.save({
        name,
        age,
        fathername,
        grandfathername,
        phone,
        sex,
        weight,
        code: patient_code,
      });
    }
    const patients = patient_find == null ? patient : patient_find;

    if (prescription.patient.ix != null) {
      const {
        microbiology,
        pathologyindex,
        radiologyindex,
        others,
        chemistry,
        endocrinology,
        hemathology,
        serology,
        urine,
      } = prescription.patient.ix;

      console.log('====================================');
      console.log(patients);
      console.log('====================================');

      await this.investigationRepo.save({
        microbiology,
        pathologyindex,
        radiologyindex,
        others,
        chemistry,
        hemathology,
        endocrinology,
        serology,
        urine,
        patient: patients,
      });
    }

    const pres = await this.prescriptionRepo.save({
      code,
      drug_name,
      frequency,
      route,
      drug,
      takein,
      patient: patients,
      ampule,
      unit,
      strength,
      remark,
      material_name,
      size,
      type,
      professional,
    });
    this.hxRepo.save({
      cc,
      hpi,
      patient: patients,
    });

    this.dxRepo.save({
      diagnosis,
      patient: patients,
    });

    this.pxRepo.save({
      abd,
      bp,
      cvs,
      ga,
      heent,
      lgs,
      pr,
      rr,
      rs,
      temp,
      patient: patients,
    });

    return pres;
  }

  findAllPrescriptions(): Observable<PrescriptionEntity[]> {
    return from(
      this.prescriptionRepo.find({
        relations: ['drug', 'patient'],
      }),
    );
  }

  findPrescriptionById(id: number): Observable<PrescriptionEntity> {
    return from(
      this.prescriptionRepo.findOne({
        where: { id },
        relations: ['drug', 'patient'],
      }),
    );
  }

  async findPrescriptionByCode(code: string): Promise<PrescriptionEntity[]> {
    const result = await this.prescriptionRepo.find({
      where: { code },
      relations: ['drug', 'patient'],
    });
    if (result.length == 0) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return result;
  }

  async findMostPrescribed(): Promise<Drug[]> {
    const pres = await this.prescriptionRepo
      .createQueryBuilder('prescription')
      .select('prescription.drugId,COUNT(prescription.drugId) as freq')
      .groupBy('prescription.drugId')
      .orderBy('COUNT(prescription.drugId)', 'DESC')
      .limit(1)
      .execute();
    if (pres != null) {
      const most = await this.drugService.findDrug(pres[0].drugId);
      return most;
    }
  }

  async findAllPrescribed(): Promise<Drug[]> {
    const pres = await this.prescriptionRepo
      .createQueryBuilder('prescription')
      .select('prescription.drugId')
      .groupBy('prescription.drugId')
      .execute();

    const allPres = [];
    if (pres != null) {
      for (let index = 0; index < pres.length; index++) {
        const element = pres[index];

        const most = await this.drugService.findDrug(element.drugId);

        allPres.push(most);
      }

      return allPres;
    }
  }
  findPatient(phone: string): Promise<PatientEntity> {
    return this.patientRepo.findOne({
      where: { phone: phone },
    });
  }
}
