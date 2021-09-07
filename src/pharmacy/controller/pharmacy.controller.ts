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
import { PharmacyDrugsEntity } from '../pharmacy.entity';
import { Pharmacy } from '../pharmacy.interface';
import { PharmacyService } from '../service/pharmacy.service';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private pharmacyService: PharmacyService) {}

//   @UseGuards(JwtGuard)
  @Post()
  create(@Body() pharmacy: Pharmacy) {
    return this.pharmacyService.create(pharmacy);
  }

  @Get()
  getPharmacyDrugs(): Observable<PharmacyDrugsEntity[]> {
    return this.pharmacyService.findAll();
  }

  @Get(':id')
  getPharmacyDrugById(
    @Param('id') id: number,
  ): Observable<PharmacyDrugsEntity[]> {
    return this.pharmacyService.find(id);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() pharmacy: Pharmacy,
  ): Observable<UpdateResult> {
    return this.pharmacyService.update(id, pharmacy);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.pharmacyService.delete(id);
  }
}
