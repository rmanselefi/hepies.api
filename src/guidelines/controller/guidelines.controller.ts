import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateGuidelineDto } from '../dto/create-guideline.dto';
import { UpdateGuidelineDto } from '../dto/update-guideline.dto';
import { GuidelinesService } from '../services/guidelines.service';


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

  @Patch('status/:id')
  updateStatus(
    @Param('id') id: number,
    @Body() updateGuidelineDto: UpdateGuidelineDto,
  ) {
    return this.guidelinesService.updateStatus(id, updateGuidelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guidelinesService.remove(+id);
  }
}
