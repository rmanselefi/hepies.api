/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { User } from 'src/auth/user.interface';
import { Repository, UpdateResult, DeleteResult, Like } from 'typeorm';
import { CommentEntity } from '../comment.entity';
import { Comment } from '../comment.interface';
import { Consult } from '../consult.interface';
import { ConsultingEntity } from '../consulting.entity';
import { InterestEntity } from '../interests.entity';
import { LikeEntity } from '../like.entity';
import { LikeCommentEntity } from '../like_comment.entity';

@Injectable()
export class ConsultingService {
  constructor(
    @InjectRepository(ConsultingEntity)
    private readonly consultRepo: Repository<ConsultingEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    @InjectRepository(InterestEntity)
    private readonly interestRepo: Repository<InterestEntity>,

    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,

    @InjectRepository(LikeCommentEntity)
    private readonly likeCommentRepo: Repository<LikeCommentEntity>,
  ) {}

  createPost(user: User, feedPost: Consult): Observable<Consult> {
    const name = user.profession[0].name + ' ' + user.profession[0].fathername;
    feedPost.author = user;
    feedPost.user = name;
    return from(this.consultRepo.save(feedPost));
  }

  findAllPosts(): Observable<Consult[]> {
    return from(
      this.consultRepo.find({
        where: {
          status: 'show',
        },
        relations: ['author', 'author.profession', 'like', 'comment'],
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
          relations: ['author', 'author.profession', 'comment', 'like'],
          where: { status: 'show' },
          order: {
            createdAt: 'DESC',
          },
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
    return from(
      this.consultRepo.update(id, {
        status: 'hide',
      }),
    );
  }

  async leaveComment(
    user: User,
    consult: Consult,
    comment: Comment,
  ): Promise<CommentEntity> {
    const name = user.profession[0].name + ' ' + user.profession[0].fathername;
    return await this.commentRepo.save({
      comment: comment.comment,
      author: name,
      user: user,
      consult: consult,
      image: comment.image,
    });
  }

  async likePost(user: User, consult: Consult): Promise<LikeEntity> {
    const found = await this.getLike(consult.id, user);
    if (found.length != 0) {
      throw new HttpException('FOUND', HttpStatus.FOUND);
    }
    return await this.likeRepo.save({
      user_id: user.id,
      user: user,
      consult: consult,
    });
  }

  async unLikePost(user: User, consult: Consult): Promise<DeleteResult> {
    const usr = {
      id: user.id,
    };

    return await this.likeRepo.delete({
      user: usr,
      consult: consult,
    });
  }

  async findComment(consultid: number): Promise<CommentEntity[]> {
    const comment = await this.commentRepo.find({
      where: { consult: consultid },
      relations: ['user', 'user.profession', 'like', 'like.comment'],
      order: { createdAt: 'DESC' },
    });
    return comment;
  }

  async findLike(consultid: number, user: User): Promise<any> {
    const comment = await this.likeRepo.find({
      where: { consult: consultid, user: user.id },
    });
    const likes = await this.likeRepo.find({
      where: { consult: consultid },
    });
    return {
      length: comment.length,
      likes: likes.length,
    };
  }

  async getLike(consultid: number, user: User): Promise<any> {
    const comment = await this.likeRepo.find({
      where: { consult: consultid, user: user.id },
    });

    return comment;
  }

  async findLikeForConsult(consultid: number): Promise<number> {
    const comment = await this.likeRepo.find({
      where: { consult: consultid },
      relations: ['user'],
    });
    return comment.length;
  }

  async findLikeForConsults(consultid: number): Promise<LikeEntity[]> {
    const likes = await this.likeRepo.find({
      where: { consult: consultid },
      relations: ['user'],
    });
    return likes;
  }

  async addInterest(interest: any): Promise<InterestEntity> {
    return await this.interestRepo.save({
      interest: interest,
    });
  }

  async getAllInterests(): Promise<InterestEntity[]> {
    const interests = await this.interestRepo.find();
    return interests;
  }

  searchPosts(take = 10, skip = 0, search): Observable<Consult[]> {
    if (!search) {
      return from(
        this.consultRepo
          .findAndCount({
            take,
            skip,
            relations: ['author', 'author.profession', 'comment', 'like'],
            order: {
              createdAt: 'DESC',
            },
          })
          .then((data) => {
            return <Consult[]>data;
          }),
      );
    } else {
      return from(
        this.consultRepo
          .findAndCount({
            take,
            skip,
            where: search ? { interests: Like(`%#${search}%`) } : {},
            relations: ['author', 'author.profession', 'comment', 'like'],
            order: {
              createdAt: 'DESC',
            },
          })
          .then((data) => {
            return <Consult[]>data;
          }),
      );
    }
  }

  async likeComment(user: User, comment: Comment): Promise<LikeCommentEntity> {
    const found = await this.getCommentLike(comment.id, user);
    if (found.length != 0) {
      throw new HttpException('FOUND', HttpStatus.FOUND);
    }
    return await this.likeCommentRepo.save({
      user_id: user.id,
      user: user,
      comment: comment,
    });
  }

  async unLikeComment(user: User, comment: Comment): Promise<DeleteResult> {
    const usr = {
      id: user.id,
    };

    return await this.likeCommentRepo.delete({
      user: usr,
      comment: comment,
    });
  }

  async getCommentLike(commentId: number, user: User): Promise<any> {
    const comment = await this.likeCommentRepo.find({
      where: { comment: commentId, user: user.id },
    });

    return comment;
  }
}
