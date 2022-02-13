import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email, verificationCode) {

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Hepies Reset Password',
      template: '../templates/verificationCode', // `.hbs` extension is appended automatically
      context: { 
        verificationCode: verificationCode
      },
    });
  }
}
