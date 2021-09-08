/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { User } from 'src/auth/user.interface';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CommentEntity } from '../comment.entity';
import { Comment } from '../comment.interface';
import { Consult } from '../consult.interface';
import { ConsultingEntity } from '../consulting.entity';
import { LikeEntity } from '../like.entity';

@Injectable()
export class ConsultingService {
  constructor(
    @InjectRepository(ConsultingEntity)
    private readonly consultRepo: Repository<ConsultingEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,

    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
  ) {}

  createPost(user: User, feedPost: Consult): Observable<Consult> {
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    feedPost.authorId = user;
    return from(this.consultRepo.save(feedPost));
  }

  findAllPosts(): Observable<Consult[]> {
    return from(
      this.consultRepo.find({
        relations: ['author'],
        order: {
          createdAt: 'DESC',
        },
      }),
    );
  }

  findPost(id: number): Observable<Consult[]> {
    return from(
      this.consultRepo.find({
        where: { id },
      }),
    );
  }

  findPosts(take = 10, skip = 0): Observable<Consult[]> {
    return from(
      this.consultRepo
        .findAndCount({
          take,
          skip,
        })
        .then((data) => {
          return <Consult[]>data;
        }),
    );
  }

  updatePost(id: number, feedPost: Consult): Observable<UpdateResult> {
    return from(this.consultRepo.update(id, feedPost));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.consultRepo.delete(id));
  }

  async leaveComment(
    user: User,
    consult: Consult,
    comment: Comment,
  ): Promise<CommentEntity> {
    return await this.commentRepo.save({
      comment: comment.comment,
      user: user,
      consult: consult,
    });
  }

  async likePost(user: User, consult: Consult): Promise<LikeEntity> {
    const found = await this.findLike(consult.id, user.id);
    if (found) {
      throw new HttpException('FOUND', HttpStatus.FOUND);
    }
    return await this.likeRepo.save({
      user: user,
      consult: consult,
    });
  }

  async unLikePost(user: User, consult: Consult): Promise<DeleteResult> {
    return await this.likeRepo.delete({
      user: user,
      consult: consult,
    });
  }

  async findComment(consultid: number): Promise<CommentEntity[]> {
    console.log('====================================');
    console.log(consultid);
    console.log('====================================');
    const comment = await this.commentRepo.find({
      where: { consult: consultid },
    });
    return comment;
  }

  async findLike(consultid: number, user: number): Promise<boolean> {
    console.log('====================================');
    console.log(consultid);
    console.log('====================================');
    const comment = await this.likeRepo.find({
      where: { consult: consultid, user: user },
    });
    if (comment == null) {
      return false;
    } else {
      return true;
    }
  }
}
