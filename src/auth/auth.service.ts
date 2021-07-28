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

  // registerUser(user: User): Observable<User> {
  //   const { name, fathername, grandfathername, email, password } = user;
  //   return this.hashPassword(password).pipe(
  //     switchMap((hashedPass: string) => {
  //       return from(
  //         this.userRepo.save({
  //           name,
  //           fathername,
  //           grandfathername,
  //           email,
  //           password: hashedPass,
  //         }),
  //       ).pipe(
  //         map((user: User) => {
  //           delete user.password;
  //           return user;
  //         }),
  //       );
  //     }),
  //   );
  // }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userRepo.findOne(
      { username },
      {
        relations: ['role', 'profession'],
      },
    );
    if (user != null) {
      const isValid = await bcrypt.compare(pass, user.password);
      const isAuthorized = user.role.name === 'admin';

      if (isValid && isAuthorized) {
        delete user.password;
        return user;
      }
    }
  }

  async login(usere: User): Promise<User> {
    const { username, password } = usere;
    const user = await this.validateUser(username, password);
    if (user) {
      const token = await this.jwtservice.signAsync(
        { user },
        {
          expiresIn: '9999 years',
        },
      );
      user.token = token;
      return user;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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
