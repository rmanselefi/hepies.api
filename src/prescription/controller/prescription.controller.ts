/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Drug } from '../../drugs/drug.interface';
import { PrescriptionEntity } from '../prescription.entity';
import { PrescriptionService } from '../service/prescription.service';
import * as crypto from 'crypto';
import { PatientEntity } from 'src/patient/patient.entity';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

@Controller('prescription')
export class PrescriptionController {
  constructor(private prescriptionService: PrescriptionService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllUsers(): Observable<PrescriptionEntity[]> {
    return this.prescriptionService.findAllPrescriptions();
  }

  @Get(':id')
  getPrescription(@Param('id') id: number): Observable<PrescriptionEntity> {
    return this.prescriptionService.findPrescriptionById(id);
  }

  @Get('code/:code')
  getPrescriptionByCode(
    @Param('code') code: string,
  ): Promise<PrescriptionEntity[]> {
    return this.prescriptionService.findPrescriptionByCode(code);
  }

  @Get('phone/:phone')
  getPrescriptionByPhone(
    @Param('phone') phone: string,
  ): Promise<PatientEntity[]> {
    return this.prescriptionService.findPrescriptionByPhone(phone);
  }

  @Post('write')
  async register(@Body() pres: any): Promise<boolean> {
    try {
      console.log('=======>', process.env.TWILIO_ACCOUNT_SID);

      const code = await crypto.randomBytes(6).toString('hex');     
      const patient = pres.patient[0];
      const phone = patient.phone;

      this.prescriptionService.registerPrescription(
        pres.prescription,
        patient,
        code,
      );

      // require the Twilio module and create a REST client
      const client = require('twilio')(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_TOKEN,
      );
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
      console.log(err);
    }
  }

  @Get('most/prescribed')
  getMostPrescribed(): Promise<Drug[]> {
    return this.prescriptionService.findMostPrescribed();
  }

  @Get('all/prescribed')
  getAllPrescribed(): Promise<Drug[]> {
    return this.prescriptionService.findAllPrescribed();
  }

  @UseGuards(JwtGuard)
  @Post('accept')
  async acceptPrescription(
    @Body() pres: number[],
    @Request() req,
  ): Promise<boolean> {
    try {
      for (let index = 0; index < pres.length; index++) {
        this.prescriptionService.acceptPrescription(pres[index], req.user);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  @UseGuards(JwtGuard)
  @Post('readby')
  async findReadById(@Request() req): Promise<PrescriptionEntity[]> {
    try {
      const res = await this.prescriptionService.getReadBy(req.user);
      return res;
    } catch (error) {
      return null;
    }
  }
}
