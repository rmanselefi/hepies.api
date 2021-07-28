import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtGuard } from '../../auth/guards/jwt.guard';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Consult } from '../consult.interface';
import { ConsultingService } from '../service/consulting.service';
import { Comment } from '../comment.interface';
import { CommentEntity } from '../comment.entity';

@Controller('consulting')
export class ConsultingController {
  constructor(private consultingService: ConsultingService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() post: Consult, @Request() req) {
    return this.consultingService.createPost(req.user, post);
  }

  @Get()
  getPosts(): Observable<Consult[]> {
    return this.consultingService.findAllPosts();
  }

  @Get('paginate')
  getSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Observable<Consult[]> {
    take = take > 20 ? 20 : take;
    return this.consultingService.findPosts(take, skip);
  }

  @Put(':id')
  updatePost(
    @Param('id') id: number,
    @Body() post: Consult,
  ): Observable<UpdateResult> {
    return this.consultingService.updatePost(id, post);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.consultingService.deletePost(id);
  }

  @UseGuards(JwtGuard)
  @Post('comment/:id')
  comment(@Param('id') id: number, @Body() post: Comment, @Request() req) {
    const consult = {
      id: id,
    };
    return this.consultingService.leaveComment(req.user, consult, post);
  }

  @Get('comment/:id')
  async findComment(@Param(':id') id: number): Promise<CommentEntity[]> {
    return await this.consultingService.findComment(id);
  }
}