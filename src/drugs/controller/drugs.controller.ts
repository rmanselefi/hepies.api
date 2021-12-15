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
import { Drug } from '../drug.interface';
import { DrugsService } from '../services/drugs.service';

@Controller('drugs')
export class DrugsController {
  constructor(private drugService: DrugsService) {}

  // @UseGuards(JwtGuard)
  @Post()
  create(@Body() drug: Drug) {
    return this.drugService.createDrug(drug);
  }

  @Post('migrate')
  migrate(@Body() drugs: any[]) {
    for (let index = 0; index < drugs.length; index++) {
      const drug = drugs[index];
      const drg: Drug = {
        name: drug.DrugName,
        about: drug.A,
        strength: drug.Common_strength,
        unit: drug.Unit,
        route: drug.Common_route,
        category: '',
        type: 'narcotics',
      };
      this.drugService.createDrug(drg);
    }
    return true;
  }

  @Get()
  getPosts(): Observable<Drug[]> {
    return this.drugService.findAllDrugs();
  }

  @Get(':id')
  getDrugById(@Param('id') id: number): Promise<Drug[]> {
    return this.drugService.findDrug(id);
  }

  @Get('find/:name')
  getDrugByName(@Param('name') name: string): Promise<Drug[]> {
    return this.drugService.findDrugByName(name);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() drug: Drug,
  ): Observable<UpdateResult> {
    return this.drugService.updateDrug(id, drug);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.drugService.deleteDrug(id);
  }
}
