import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { User } from './user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  // @Post('register')
  // register(@Body() user: User): Observable<User> {
  //   return this.authservice.registerUser(user);
  // }

  @Post('login')
  async login(@Body() user: User): Promise<User> {
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    const res = await this.authservice.login(user);
    return res;
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async findUser(@Request() req): Promise<User> {
    const res = await this.authservice.findUserById(req.user.id);
    return res;
  }
}