import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateGuidelineDto } from './dto/create-guideline.dto';
import { UpdateGuidelineDto } from './dto/update-guideline.dto';
import { GuidelinesEntity } from './entities/guideline.entity';

@Injectable()
export class GuidelinesService {
  constructor(
    @InjectRepository(GuidelinesEntity)
    private readonly pointsRepo: Repository<GuidelinesEntity>,
  ) {}
  create(createGuidelineDto: CreateGuidelineDto): Promise<CreateGuidelineDto> {
    return this.pointsRepo.save(createGuidelineDto);
  }

  findAll(): Promise<CreateGuidelineDto[]> {
    return this.pointsRepo.find();
  }

  findOne(id: number): Promise<CreateGuidelineDto> {
    return this.pointsRepo.findOne(id);
  }

  update(
    id: number,
    updateGuidelineDto: UpdateGuidelineDto,
  ): Promise<UpdateResult> {
    return this.pointsRepo.update(id, updateGuidelineDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.pointsRepo.delete(id);
  }
}
