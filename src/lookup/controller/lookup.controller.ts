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
import { Lookup } from '../lookup.interface';
import { LookupService } from '../service/lookup.service';

@Controller('lookup')
export class LookupController {
  constructor(private lookupService: LookupService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() lookup: Lookup) {
    return this.lookupService.create(lookup);
  }

  @Get()
  getPosts(): Observable<Lookup[]> {
    return this.lookupService.findAll();
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() points: Lookup,
  ): Observable<UpdateResult> {
    return this.lookupService.update(id, points);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.lookupService.delete(id);
  }
}
