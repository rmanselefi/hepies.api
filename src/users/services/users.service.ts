/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Proffesional } from '../professional.interface';
import * as bcrypt from 'bcrypt';
import { ProffesionalEntity } from '../professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../auth/user.entity';
import { User } from 'src/auth/user.interface';

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

  async updateProfile(
    id: number,
    proffesional: Proffesional,
  ): Promise<Proffesional> {
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
      dob,
      sex,
    } = proffesional;
    const { username } = proffesional.user;
    console.log('====================================');
    console.log(username);
    console.log('====================================');
    await this.userRepo.update(proffesional.user.id, {
      username,
    });

    const result = await this.professionalRepo.update(id, {
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
      dob,
      sex,
    });
    if (result.affected == 1) {
      const profession = await this.findUserById(id);
      return profession;
    }
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

  canSee(id: number, active: string): Observable<UpdateResult> {
    return from(
      this.userRepo.update(id, {
        isFit: active,
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

  async transferPoint(
    user: User,
    professional: Proffesional,
  ): Promise<UpdateResult> {
    console.log('====================================');
    console.log(professional);
    console.log('====================================');
    const phone = professional.phone;
    const point = professional.points;
    const tranPoint = user.profession[0].points;
    const transId = user.profession[0].id;
    const newTranPoint = Number(tranPoint) - Number(point);
    const pnt = await this.professionalRepo.findOne({
      where: { phone },
    });
    if (pnt == null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const newPoint = Number(pnt.points) + Number(point);

    await this.professionalRepo.update(transId, {
      points: newTranPoint.toString(),
    });
    const result = await this.professionalRepo.update(pnt.id, {
      points: newPoint.toString(),
    });

    return result;
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userRepo.findOne({ username });
    if (user != null) {
      const isValid = await bcrypt.compare(pass, user.password);

      if (isValid) {
        delete user.password;
        return user;
      } else {
        return null;
      }
    }
  }

  async changePassword(
    id: number,
    password: string,
    username: string,
    oldpassword: string,
  ): Promise<string> {
    const userExists = await this.validateUser(username, oldpassword);
    if (userExists != null) {
      const hashed_password = await this.hashPassword(password);
      await this.userRepo.update(id, {
        password: hashed_password,
      });

      return 'Updated';
    } else {
      throw new HttpException('Found', HttpStatus.FOUND);
    }
  }
}
