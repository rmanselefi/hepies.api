/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PasswordResetEntity } from '../passwordReset.entity';
import { UserEntity } from '../../auth/user.entity';
import { PasswordReset } from '../passwordReset.interface';
import { ProffesionalEntity } from '../../users/professional.entity';
import { Proffesional } from '../../users/professional.interface';
import { MailService } from '../../mail/services/mail.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class PasswordResetService {
  constructor(
    private mailService: MailService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
    @InjectRepository(ProffesionalEntity)
    private readonly professionalRepo: Repository<ProffesionalEntity>,
  ) {}
  
  async checkEmail(email: string): Promise<ProffesionalEntity> {
    const user = await this.professionalRepo.findOne({
      where: { email:email },
    });
      return user;
  }

  async codeGenerate(userEmail: string): Promise<boolean> {
    
    var passwordReset: PasswordReset;
    const verificationCode = Math.floor(Math.random() * 90000) + 10000;
    const expiryTime = (Math.round((new Date()).getTime() / 1000))+3600;

     passwordReset = {
      'email':userEmail,
      'verification_code': verificationCode,
      'expires_in':expiryTime,
    };

    const {
      email,
      verification_code,
      expires_in,
     
    } = passwordReset;

    await this.passwordResetRepo.delete({email:userEmail});
    const passwordResetSave = await this.passwordResetRepo.save(passwordReset);
    delete (await passwordReset).verification_code;
  
    await this.mailService.sendUserConfirmation(email, verification_code);

    return true;
  }

  async checkVerificationCode(userEmail: string,verificationCode): Promise<boolean> {
    
    const getCode = await this.passwordResetRepo.findOne({
      where: { email:userEmail,
               verification_code:verificationCode },
      order: { createdAt: 'DESC' },
    });
    const timeNow = (Math.round((new Date()).getTime() / 1000));
    if (getCode && ((getCode.expires_in - timeNow) >= 0)) {
      return true;
    } else {
      return false;
    }
  }

  async changePassword(email: string,verification_code: number,password: string): Promise<any> {
    const userExists =  await this.professionalRepo.findOne({
      where: {email:email },
      relations:['user'],
    });
    if (userExists != null) {
      const checkCode = this.checkVerificationCode(email,verification_code);
      if(!checkCode){
        throw new HttpException('Found', HttpStatus.FOUND);
      };     

      const hashed_password = await this.hashPassword(password);     
      const updated = await this.userRepo.update(userExists['user']['id'], {
        password: hashed_password,
        active:'true'
      });     
      return updated;
    } else {
      throw new HttpException('Found', HttpStatus.FOUND);
    }
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
