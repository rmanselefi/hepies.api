import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuidelinesService } from './guidelines.service';
import { CreateGuidelineDto } from './dto/create-guideline.dto';
import { UpdateGuidelineDto } from './dto/update-guideline.dto';

@Controller('guidelines')
export class GuidelinesController {
  constructor(private readonly guidelinesService: GuidelinesService) {}

  @Post()
  create(@Body() createGuidelineDto: CreateGuidelineDto) {
    return this.guidelinesService.create(createGuidelineDto);
  }

  @Get()
  findAll() {
    return this.guidelinesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guidelinesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGuidelineDto: UpdateGuidelineDto,
  ) {
    return this.guidelinesService.update(+id, updateGuidelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidelinesService.remove(+id);
  }
}
