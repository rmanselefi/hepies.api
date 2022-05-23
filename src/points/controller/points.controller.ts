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
import { Points } from '../points.interface';
import { PointsService } from '../service/points.service';

@Controller('points')
export class PointsController {
  constructor(private pointsService: PointsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() points: Points) {
    return this.pointsService.createPoint(points);
  }

  @Get()
  getPoints(): Promise<Points[]> {
    return this.pointsService.findAllPoints();
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() points: Points,
  ): Observable<UpdateResult> {
    return this.pointsService.updatePoint(id, points);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.pointsService.deletePoint(id);
  }
}
