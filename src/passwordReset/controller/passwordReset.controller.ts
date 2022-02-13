/* eslint-disable prettier/prettier */
import {Body,Controller,Delete,Get,Param,Post,Put,UseGuards,Request, HttpException, HttpStatus} from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { Roles } from '../../auth/decorators/roles.decorators';
  import { JwtGuard } from '../../auth/guards/jwt.guard';
  import { Role } from '../../auth/decorators/role.enum';
  import { User } from '../../auth/user.interface';
  import { DeleteResult, UpdateResult } from 'typeorm';
  import { PasswordResetService } from '../services/passwordReset.service';
  import { RolesGuard } from '../../auth/guards/roles.guard';
import { UsersService } from '../../users/services/users.service';
  
  @Controller('passwordReset')
  export class PasswordResetController {
    constructor(private passwordResetService: PasswordResetService) {}

    @Post('send-code')
    sendCode(@Body() userEmail): Promise<any> {
      if(!userEmail['email']){
        throw new HttpException('Email', HttpStatus.NOT_FOUND);
      };
      const user = this.passwordResetService.checkEmail(userEmail['email']);
      if(!user){
        throw new HttpException('Email', HttpStatus.NOT_FOUND);
      };
      const sendCode = this.passwordResetService.codeGenerate(userEmail['email']);
      return sendCode;
    }

    @Post('check-code')
    getAllUsers(@Body() resetBody):  Promise<any> {
      if (!resetBody['email'] || !resetBody['verification_code']) {
        throw new HttpException('Email or Verification code', HttpStatus.NOT_FOUND);
      }
      const check = this.passwordResetService.checkVerificationCode(resetBody['email'],resetBody['verification_code']);
      return check;
    }
  
  }
  