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
  getPatient(@Param('phone') phone: string): Observable<PatientEntity[]> {
    return this.patientService.findPatient(phone);
  }

  //   @Get('paginate')
  //   getSelected(
  //     @Query('take') take = 1,
  //     @Query('skip') skip = 1,
  //   ): Observable<Consult[]> {
  //     take = take > 20 ? 20 : take;
  //     return this.drugService.findPosts(take, skip);
  //   }

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
