/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userRepo.findOne(
      { username, active: 'true' },
      {
        relations: ['role', 'profession'],
      },
    );
    if (user != null) {
      const isValid = await bcrypt.compare(pass, user.password);
      const isAuthorized =
        user.role.name === 'doctor' ||
        user.role.name === 'pharmacy' ||
        user.role.name === 'healthofficer' ||
        user.role.name === 'nurse';

      if (isValid && isAuthorized) {
        delete user.password;
        return user;
      } else {
        return null;
      }
    }
  }

  async validateAdminUser(username: string, pass: string): Promise<User> {
    const user = await this.userRepo.findOne(
      { username },
      {
        relations: ['role', 'profession'],
      },
    );
    if (user != null) {
      const isValid = await bcrypt.compare(pass, user.password);
      const isAuthorized =
        user.role.name === 'admin' || user.role.name === 'customer_service';

      if (isValid && isAuthorized) {
        delete user.password;
        return user;
      } else {
        return null;
      }
    }
  }

  async login(usere: User): Promise<User> {
    const { username, password } = usere;
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const token = await this.jwtservice.signAsync(
      { user },
      {
        expiresIn: '9999 years',
      },
    );
    user.token = token;
    return user;
  }

  async adminLogin(usere: User): Promise<User> {
    const { username, password } = usere;
    const user = await this.validateAdminUser(username, password);
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const token = await this.jwtservice.signAsync(
      { user },
      {
        expiresIn: '9999 years',
      },
    );
    user.token = token;
    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['role', 'profession'],
    });
    delete user.password;
    return user;
  }
}
