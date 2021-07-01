import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Proffesional } from '../professional.interface';
import * as bcrypt from 'bcrypt';
import { ProffesionalEntity } from '../professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../auth/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(ProffesionalEntity)
    private readonly professionalRepo: Repository<ProffesionalEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async registerUser(professional: Proffesional): Promise<Proffesional> {
    const {
      name,
      fathername,
      grandfathername,
      phone,
      proffesion,
      profile,
      license,
      email,
      interests,
      points,
      speciality,
      workplace,
    } = professional;
    const { username, password, role } = professional.user;
    const hashed_password = await this.hashPassword(password);

    const user = await this.userRepo.save({
      username,
      password: hashed_password,
      role,
    });

    const pro = this.professionalRepo.save({
      name,
      fathername,
      grandfathername,
      proffesion,
      profile,
      phone,
      license,
      user,
      email,
      interests,
      points,
      speciality,
      workplace,
    });
    delete (await pro).user.password;
    return pro;
  }

  findAllUsers(): Observable<Proffesional[]> {
    return from(
      this.professionalRepo.find({
        relations: ['user'],
      }),
    );
  }

  async findUserById(id: number): Promise<Proffesional> {
    return await this.professionalRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updateUser(
    id: number,
    proffesional: Proffesional,
  ): Promise<UpdateResult> {
    const {
      name,
      fathername,
      grandfathername,
      phone,
      proffesion,
      profile,
      license,
      email,
      interests,
      points,
      speciality,
      workplace,
    } = proffesional;
    const { username, role } = proffesional.user;
    await this.userRepo.update(proffesional.user.id, {
      username,
      role,
    });

    return await this.professionalRepo.update(id, {
      name,
      fathername,
      grandfathername,
      phone,
      proffesion,
      profile,
      license,
      email,
      interests,
      points,
      speciality,
      workplace,
    });
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const res = await this.findUserById(id);
    await this.professionalRepo.delete(id);
    return this.userRepo.delete(res.user.id);
  }

  enableDisableUser(id: number, active: string): Observable<UpdateResult> {
    return from(
      this.userRepo.update(id, {
        active,
      }),
    );
  }

  async removePoint(id: number, point: string): Promise<UpdateResult> {
    const pnt = await this.professionalRepo.findOne(id);
    const newPoint = Number(pnt.points) - Number(point);

    const result = await this.professionalRepo.update(id, {
      points: newPoint.toString(),
    });
    return result;
  }

  async rewardPoint(id: number, point: string): Promise<UpdateResult> {
    const pnt = await this.professionalRepo.findOne(id);
    const newPoint = Number(pnt.points) + Number(point);

    const result = await this.professionalRepo.update(id, {
      points: newPoint.toString(),
    });
    return result;
  }
}
