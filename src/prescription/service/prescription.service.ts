/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { PatientEntity } from '../../patient/patient.entity';
import { Repository, UpdateResult } from 'typeorm';
import { PrescriptionEntity } from '../prescription.entity';
import * as crypto from 'crypto';
import { DrugsService } from '../../drugs/services/drugs.service';
import { Drug } from '../../drugs/drug.interface';
import { DxEntity } from '../entities/dx.entity';
import { User } from 'src/auth/user.interface';
import { ProffesionalEntity } from '../../users/professional.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepo: Repository<PrescriptionEntity>,

    @InjectRepository(PatientEntity)
    private readonly patientRepo: Repository<PatientEntity>,

    @InjectRepository(DxEntity)
    private readonly dxRepo: Repository<DxEntity>,
    @InjectRepository(ProffesionalEntity)
    private readonly professionalRepo: Repository<ProffesionalEntity>,

    private drugService: DrugsService,
  ) {}

  async registerPrescription(
    prescription: any,
    patientt: any,
    code: string,
  ): Promise<PrescriptionEntity> {
    const {
      age,
      age_label,
      fathername,
      grandfathername,
      name,
      phone,
      sex,
      weight,
      professionid,
    } = patientt;

    const patient_cod = await crypto.randomBytes(4).toString('hex');

    const patient_code = 'PATIENT' + patient_cod;
    const patient_find = await this.findPatient(phone);
    let patient;

    if (patient_find == null) {
      patient = await this.patientRepo.save({
        name,
        age,
        age_label,
        fathername,
        grandfathername,
        phone,
        sex,
        weight,
        code: patient_code,
      });
      if (weight != null || weight != '') {
        const pnt = await this.professionalRepo.findOne(professionid);
        const newPoint = Number(pnt.points) + Number(0.5);

        await this.professionalRepo.update(professionid, {
          points: newPoint.toString(),
        });
      }
    } else {
      if (weight != null || weight != '') {
        console.log('==============patient_find======================');
        console.log(patient_find);
        console.log('===================patient_find=================');
        this.patientRepo.update(patient_find.id, {
          weight,
        });

        const pnt = await this.professionalRepo.findOne(professionid);
        const point = pnt.points == null ? 0 : pnt.points;
        console.log('==============pnt======================');
        console.log(pnt);
        console.log('===================pnt=================');
        const newPoint = Number(point) + Number(0.5);


        console.log('==============professionid======================');
        console.log(professionid);
        console.log('===================professionid=================');

        this.professionalRepo.update(professionid, {
          points: newPoint.toString(),
        });
      }
    }
    const patients = patient_find == null ? patient : patient_find;
    let pres = null;
    for (let index = 0; index < prescription.length; index++) {
      const presc = prescription[index];
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
        dx,
      } = presc;
      pres = await this.prescriptionRepo.save({
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
      const { diagnosis } = dx;
      if (diagnosis != null || diagnosis != '') {
        this.dxRepo.save({
          diagnosis,
          patient: patients,
        });
        if (diagnosis.length >= 3) {
          const pnt = await this.professionalRepo.findOne(professionid);
          console.log('==============diagnosis======================');
          console.log(pnt);
          console.log('===================diagnosis=================');
          const point = pnt.points == null ? 0 : pnt.points;
          const newPoint = Number(point) + Number(0.5);

          await this.professionalRepo.update(professionid, {
            points: newPoint.toString(),
          });
        }
      }
    }
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

  async findPrescriptionByPhone(phone: string): Promise<PatientEntity[]> {
    const result = await this.patientRepo.find({
      where: { phone },
      relations: ['prescription'],
    });
    if (result.length == 0) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return result;
  }

  async findPrescriptionByCode(code: string): Promise<PrescriptionEntity[]> {
    const result = await this.prescriptionRepo.find({
      where: { code, status: 'NotRead' },
      relations: ['drug', 'patient'],
    });
    if (result.length == 0) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return result;
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

  async acceptPrescription(id: number, user: User): Promise<UpdateResult> {
    const name = user.profession[0].name + ' ' + user.profession[0].fathername;
    const profession_id = user.profession[0].id;
    const user_id = user.id;
    const pnt = await this.professionalRepo.findOne(profession_id);
    const newPoint = Number(pnt.points) + Number(0.2);

    this.professionalRepo.update(profession_id, {
      points: newPoint.toString(),
    });
    return this.prescriptionRepo.update(id, {
      status: 'Read',
      readby: name,
      readbyid: user_id,
      readDate: new Date(),
    });
  }

  getReadBy(user: User): Promise<PrescriptionEntity[]> {
    const user_id = user.id;
    return this.prescriptionRepo.find({
      where: { readbyid: user_id, status: 'Read' },
      relations: ['patient'],
    });
  }
}
