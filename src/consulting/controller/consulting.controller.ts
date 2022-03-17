/* eslint-disable prettier/prettier */
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
import { InterestEntity } from '../interests.entity';
import { LikeEntity } from '../like.entity';

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

  @Get(':id')
  getPost( @Param('id') id: number,): Observable<Consult> {
    return this.consultingService.findPost(id);
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
  async findComment(@Param('id') id: number): Promise<CommentEntity[]> {
    return await this.consultingService.findComment(id);
  }

  @UseGuards(JwtGuard)
  @Post('like/:id')
  likePost(@Param('id') id: number, @Request() req) {
    const consult = {
      id,
    };

    return this.consultingService.likePost(req.user, consult);
  }

  @UseGuards(JwtGuard)
  @Post('unlike/:id')
  unlikePost(@Param('id') id: number, @Request() req) {
    const consult = {
      id,
    };
    return this.consultingService.unLikePost(req.user, consult);
  }

  @Get('comments/:id')
  async findCommentLength(@Param('id') id: number): Promise<number> {
    const length = await (await this.consultingService.findComment(id)).length;
    return length;
  }

  @UseGuards(JwtGuard)
  @Post('like/find/:id')
  async findLikeForUser(@Param('id') id: number, @Request() req): Promise<any> {
    const found = await await this.consultingService.findLike(id, req.user);
    return found;
  }

  @Get('likes/:id')
  async findLikesForConsult(@Param('id') id: number): Promise<number> {
    const length = await await this.consultingService.findLikeForConsult(id);
    return length;
  }

  @Get('likes/search/:id')
  async findLikesForConsults(@Param('id') id: number): Promise<LikeEntity[]> {
    const likes = await await this.consultingService.findLikeForConsults(id);
    return likes;
  }

  @Post('interest')
  addInterest(@Body() interest: any) {
    return this.consultingService.addInterest(interest.interest);
  }

  @Get('interests')
  async getAllInterests(): Promise<InterestEntity[]> {
    const interests = await await this.consultingService.getAllInterests();
    return interests;
  }

  @Get('search')
  searchConsults(
    @Query('search') search = null,
    @Query('take') take = 1,
    @Query('skip') skip = 0,
  ): Observable<Consult[]> {
    take = take > 20 ? 20 : take;
    return this.consultingService.searchPosts(take, skip,search);
  }


  @UseGuards(JwtGuard)
  @Post('like/comment/:id')
  likeComment(@Param('id') id: number, @Request() req) {
    const comment = {
      id,
    };

    return this.consultingService.likeComment(req.user, comment);
  }

  @UseGuards(JwtGuard)
  @Post('unlike/comment/:id')
  unlikeComment(@Param('id') id: number, @Request() req) {
    const comment = {
      id,
    };
    return this.consultingService.unLikeComment(req.user, comment);
  }
}
