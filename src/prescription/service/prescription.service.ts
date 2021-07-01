import { Injectable } from '@nestjs/common';
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
import { HemathologyEntity } from '../entities/hemathology.entity';
import { ChemistryEntity } from '../entities/chemistry.entity';
import { EndocrinologyEntity } from '../entities/endocrinology.entity';
import { SerologyEntity } from '../entities/serology.entity';
import { UrineEntity } from '../entities/urine.entity';
import { DrugsService } from '../../drugs/services/drugs.service';
import { Drug } from '../../drugs/drug.interface';
import { getManager } from 'typeorm';

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

    @InjectRepository(InvestigationEntity)
    private readonly investigationRepo: Repository<InvestigationEntity>,

    @InjectRepository(HemathologyEntity)
    private readonly hemaRepo: Repository<HemathologyEntity>,

    @InjectRepository(ChemistryEntity)
    private readonly chemistryRepo: Repository<ChemistryEntity>,

    @InjectRepository(EndocrinologyEntity)
    private readonly endoRepo: Repository<EndocrinologyEntity>,

    @InjectRepository(SerologyEntity)
    private readonly serologyRepo: Repository<SerologyEntity>,

    @InjectRepository(UrineEntity)
    private readonly urineRepo: Repository<UrineEntity>,
    private drugService: DrugsService,
  ) {}

  async registerPrescription(
    prescription: Prescription,
  ): Promise<PrescriptionEntity> {
    const { dose, drug, frequency, route, takein } = prescription;
    const { age, fathername, dx, grandfathername, name, phone, sex, weight } =
      prescription.patient;
    const { cc, hpi } = prescription.patient.hx;
    const { abd, bp, cvs, ga, heent, lgs, pr, rr, rs, temp } =
      prescription.patient.px;

    const code = await crypto.randomBytes(6).toString('hex');
    const entityManager = getManager();
    const someQuery = await entityManager.query(
      ` SELECT nextval('patient_code'); `,
    );
    const patient_code = 'PATIENT' + someQuery[0].nextval;
    console.log('====================================');
    console.log(patient_code);
    console.log('====================================');
    let investigation = null;
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

      const {
        TIBC,
        albumin,
        alp,
        altsgpt,
        amylase,
        ferritin,
        hba1c,
        hdl,
        astsgot,
        bunurea,
        calcium,
        calciumionized,
        chloride,
        cholesterol,
        fbs,
        iron,
        ldl,
        lipase,
        magnesium,
        phosphorous,
        potassium,
        protein,
        rbs,
        serumfolate,
        sodium,
        transferrinsaturation,
        triglyceride,
      } = chemistry;

      const {
        bgrh,
        esr,
        hct,
        mch,
        mchc,
        mcv,
        pltcount,
        reticulocyte,
        wbccount,
      } = hemathology;

      const {
        erythropoietin,
        estradiol,
        fsh,
        growthhormone,
        lh,
        progesterone,
        prolactin,
        pth,
        serumcalcitonin,
        serumcortisol,
        t3,
        t4,
        testosterone,
        tsh,
        vitD,
        vitb12,
      } = endocrinology;

      const {
        CD4count,
        HBsAg,
        HIVmedical,
        HIVviralload,
        ana,
        aso,
        betahcg,
        coombs,
        crp,
        rf,
        welfelix,
        widal,
      } = serology;

      const { stoolexam, stooloccultblood, stoolplylori, urinehcg } = urine;
      const uri = this.urineRepo.save({
        stoolexam,
        stooloccultblood,
        stoolplylori,
        urinehcg,
      });

      const sero = this.serologyRepo.save({
        CD4count,
        HBsAg,
        HIVmedical,
        HIVviralload,
        ana,
        aso,
        betahcg,
        coombs,
        crp,
        rf,
        welfelix,
        widal,
      });

      const endo = this.endoRepo.save({
        erythropoietin,
        estradiol,
        fsh,
        growthhormone,
        lh,
        progesterone,
        prolactin,
        pth,
        serumcalcitonin,
        serumcortisol,
        t3,
        t4,
        testosterone,
        tsh,
        vitD,
        vitb12,
      });

      const hema = this.hemaRepo.save({
        bgrh,
        esr,
        hct,
        mch,
        mchc,
        mcv,
        pltcount,
        reticulocyte,
        wbccount,
      });
      const chemistr = await this.chemistryRepo.save({
        TIBC,
        albumin,
        alp,
        altsgpt,
        amylase,
        ferritin,
        hba1c,
        hdl,
        astsgot,
        bunurea,
        calcium,
        calciumionized,
        chloride,
        cholesterol,
        fbs,
        iron,
        ldl,
        lipase,
        magnesium,
        phosphorous,
        potassium,
        protein,
        rbs,
        serumfolate,
        sodium,
        transferrinsaturation,
        triglyceride,
      });
      investigation = await this.investigationRepo.save({
        microbiology,
        pathologyindex,
        radiologyindex,
        others,
        chemistr,
        hema,
        endo,
        sero,
        uri,
      });
    }

    const patient = await this.patientRepo.save({
      name,
      age,
      fathername,
      grandfathername,
      phone,
      sex,
      weight,
      dx,
      code: patient_code,
      ix: investigation,
    });
    const pres = await this.prescriptionRepo.save({
      code,
      dose,
      frequency,
      route,
      drug,
      takein,
      patient,
    });
    this.hxRepo.save({
      cc,
      hpi,
      patient,
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
      patient,
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

  findPrescriptionByCode(code: string): Observable<PrescriptionEntity> {
    return from(
      this.prescriptionRepo.findOne({
        where: { code },
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
}
