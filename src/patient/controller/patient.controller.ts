/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Patient } from '../patient.interface';
import { PatientService } from '../service/patient.service';
import { PatientEntity } from '../patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() patient: Patient) {
    return this.patientService.createPatient(patient);
  }

  @Get()
  getPosts(): Observable<PatientEntity[]> {
    return this.patientService.findAllPatients();
  }

  @Get('medicalrecord/:phone')
  getPatient(@Param('phone') phone: string): Promise<PatientEntity[]> {
    return this.patientService.findPatient(phone);
  }

  @Get('patient/:phone')
  getPatientByPhone(@Param('phone') phone: string): Promise<PatientEntity> {
    return this.patientService.getPatient(phone);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() patient: Patient,
  ): Observable<UpdateResult> {
    return this.patientService.updatePatient(id, patient);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.patientService.deletePatient(id);
  }
}
