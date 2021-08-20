/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { Drug } from '../../drugs/drug.interface';
import { Prescription } from '../models/prescription.interface';
import { PrescriptionEntity } from '../prescription.entity';
import { PrescriptionService } from '../service/prescription.service';
import * as crypto from 'crypto';


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
  ): Observable<PrescriptionEntity> {
    return this.prescriptionService.findPrescriptionByCode(code);
  }

  @Post('write')
  async register(@Body() pres: Prescription[]): Promise<PrescriptionEntity>  {
    const code = await crypto.randomBytes(6).toString('hex');

    for (let index = 0; index < pres.length; index++) {
      const presc = pres[index];
      return this.prescriptionService.registerPrescription(presc,code);
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
}
