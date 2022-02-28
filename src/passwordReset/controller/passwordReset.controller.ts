/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
  async sendCode(@Body() userEmail) {
    if (!userEmail['email']) {
      throw new HttpException('Email', HttpStatus.NOT_FOUND);
    }
    const user = this.passwordResetService.checkEmail(userEmail['email']);
    if (!user) {
      throw new HttpException('Email', HttpStatus.NOT_FOUND);
    }
    const sendCode = await this.passwordResetService.codeGenerate(
      userEmail['email'],
    );
    if (sendCode) {
      return {
        statusCode: 200,
        message: 'Verification Code Sent',
      };
    } else {
      return {
        statusCode: 500,
        message: 'Verification Code not Sent!Try Again',
      };
    }
  }

  @Post('check-code')
  async getAllUsers(@Body() resetBody) {
    if (!resetBody['email'] || !resetBody['verification_code']) {
      throw new HttpException(
        'Email or Verification code',
        HttpStatus.NOT_FOUND,
      );
    }
    const check = await this.passwordResetService.checkVerificationCode(
      resetBody['email'],
      resetBody['verification_code'],
    );
    if (check) {
      return {
        statusCode: 200,
        message: 'Verification Code is correct!',
        status: true,
      };
    } else {
      return {
        statusCode: 200,
        message: 'Verification Code is Incorrect!',
        status: false,
      };
    }
  }

  @Post('change')
  async changePassword(@Body() resetBody: any) {
    if (
      !resetBody['email'] ||
      !resetBody['password'] ||
      !resetBody['verification_code']
    ) {
      throw new HttpException(
        'Email or Verification code',
        HttpStatus.NOT_FOUND,
      );
    }
    const check = await this.passwordResetService.checkVerificationCode(
      resetBody['email'],
      resetBody['verification_code'],
    );
    if (check) {
      const changes = this.passwordResetService.changePassword(
        resetBody['email'],
        resetBody['verification_code'],
        resetBody['password'],
      );

      if (changes) {
        return {
          statusCode: 200,
          message: 'updated!',
          status: true,
        };
      } else {
        return {
          statusCode: 200,
          message: 'Failed to update!',
          status: false,
        };
      }
    } else {
      return {
        statusCode: 200,
        message: 'Verification Code is Incorrect!',
        status: false,
      };
    }
  }
}
