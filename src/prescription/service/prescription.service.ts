/* eslint-disable @typescript-eslint/no-var-requires */
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
import { DrugEntity } from '../../drugs/drugs.entity';
import { PrescriptionItemEntity } from '../entities/prescription_items.entity';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_TOKEN,
);

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepo: Repository<PrescriptionEntity>,

    @InjectRepository(PrescriptionItemEntity)
    private readonly itemsRepo: Repository<PrescriptionItemEntity>,

    @InjectRepository(PatientEntity)
    private readonly patientRepo: Repository<PatientEntity>,

    @InjectRepository(DxEntity)
    private readonly dxRepo: Repository<DxEntity>,
    @InjectRepository(ProffesionalEntity)
    private readonly professionalRepo: Repository<ProffesionalEntity>,

    @InjectRepository(DrugEntity)
    private readonly drugRepo: Repository<DrugEntity>,

    private drugService: DrugsService,
  ) {}

  async resend(id): Promise<boolean> {
    try {
      const prescription = await this.prescriptionRepo.find({
        where: { id },
        relations: ['patient'],
      });
      const code = prescription[0].code;
      const phone = prescription[0].patient.phone;

      client.messages
        .create({
          to: phone,
          from: '+12692318349',
          body:
            'This is your prescription code please go to nearby pharmacy and purchase your prescription--' +
            code,
        })
        .then((message) => console.log(message.sid));
      return true;
    } catch (err) {
      return false;
    }
  }

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
      mrn,
      professionid,
    } = patientt;

    const patient_cod = await crypto.randomBytes(4).toString();

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
        mrn,
        code: patient_code,
      });
    }
    const patients = patient_find == null ? patient : patient_find;

    const presc = prescription[0];

    const { remark, type, professional, dx } = presc;
    const { diagnosis } = dx;
    const pres = await this.prescriptionRepo.save({
      code,
      patient: patients,
      remark,
      type,
      professional,
      diagnosis,
      professionalid: professionid,
    });

    if (diagnosis != null || diagnosis != '') {
      this.dxRepo.save({
        diagnosis,
        patient: patients,
      });
    }

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
        material_name,
        size,
        drug_name,
        type,
      } = presc;

      // update drug prescription number
      const drg = await this.drugRepo.findOne(drug);
      const amt = drg.number_prescription;
      this.drugRepo.update(drug, {
        number_prescription: amt + 1,
        prescribed: true,
      });

      await this.itemsRepo.save({
        code,
        drug_name,
        frequency,
        route,
        drug,
        takein,
        ampule,
        unit,
        strength,
        material_name,
        size,
        type,
        professional,
        professionalid: professionid,
        prescription: pres,
        patient: patients,
      });
    }
    return pres;
  }

  findAllPrescriptions(): Observable<PrescriptionEntity[]> {
    return from(
      this.prescriptionRepo.find({
        relations: ['drug', 'patient'],
        order: { createdAt: 'DESC' },
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

  async findPrescriptionPaper(code: string): Promise<PrescriptionItemEntity[]> {
    return this.itemsRepo.find({
      where: { code },
    });
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
      relations: ['prescription', 'prescription_item'],
    });
    const filtered = result.filter((f) =>
      f.prescription_item.filter((pre) => pre.status !== 'Read'),
    );

    console.log('====================================');
    console.log(filtered);
    console.log('====================================');
    if (filtered.length == 0) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return filtered;
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
    try {
      console.log('===============id=====================');
      console.log(id);
      console.log('=================id===================');
      const name =
        user.profession[0].name + ' ' + user.profession[0].fathername;
      const accepter_id = user.profession[0].id;
      const user_id = user.id;

      const professional = await this.professionalRepo.findOne(accepter_id);

      const newPoint = Number(professional.points) + Number(0.2);
      const newOverAll = Number(professional.overall_points) + Number(0.2);
      this.professionalRepo.update(accepter_id, {
        points: newPoint.toString(),
        overall_points: newOverAll.toString(),
      });

      const presItem = await this.itemsRepo.findOne({
        where: { id },
        relations: ['patient', 'prescription'],
      });
      console.log('');
      console.log('===============presItem=====================');
      console.log(presItem);
      console.log('=================presItem===================');

      const writer_id = presItem.professionalid;
      const weight = presItem.patient.weight;

      const pres = await this.prescriptionRepo.findOne({
        where: { id: presItem.prescription.id },
        relations: ['patient'],
      });
      const diagnosis = pres.diagnosis;

      if (weight != null || weight != '') {
        const writer = await this.professionalRepo.findOne(writer_id);
        const point = writer.points == null ? 0 : writer.points;
        const overall_point =
          writer.overall_points == null ? 0 : writer.overall_points;
        const writerNewPoint = Number(point) + Number(0.5);
        const newOverAll = Number(overall_point) + Number(0.2);
        this.professionalRepo.update(writer.id, {
          points: writerNewPoint.toString(),
          overall_points: newOverAll.toString(),
        });
      }

      if ((diagnosis != null || diagnosis != '') && diagnosis.length >= 3) {
        const pnt = await this.professionalRepo.findOne(writer_id);
        const point = pnt.points == null ? 0 : pnt.points;
        const overall_point =
          pnt.overall_points == null ? 0 : pnt.overall_points;
        const newPoint = Number(point) + Number(0.5);
        const newOverAll = Number(overall_point) + Number(0.5);
        await this.professionalRepo.update(pnt.id, {
          points: newPoint.toString(),
          overall_points: newOverAll.toString,
        });
      }

      return this.itemsRepo.update(id, {
        status: 'Read',
        readby: name,
        readbyid: user_id,
        readDate: new Date(),
      });
    } catch (e) {
      return e;
    }
  }

  getReadBy(user: User): Promise<PrescriptionEntity[]> {
    const user_id = user.id;
    return this.prescriptionRepo.find({
      where: { readbyid: user_id, status: 'Read' },
      relations: ['patient'],
    });
  }

  getPrescriptionHistory(id: any): Promise<PrescriptionItemEntity[]> {
    return this.itemsRepo.find({
      where: { professionalid: id },
      relations: ['patient'],
    });
  }

  getPharmacyHistory(id: any): Promise<PrescriptionEntity[]> {
    return this.prescriptionRepo.find({
      where: { readby: id },
      relations: ['patient', 'drug'],
    });
  }
}
