/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConsultingModule } from './consulting/consulting.module';
import { PatientModule } from './patient/patient.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { DrugsModule } from './drugs/drugs.module';
import { PointsModule } from './points/points.module';
import { LookupModule } from './lookup/lookup.module';
import { RolesModule } from './roles/roles.module';
import { GuidelinesModule } from './guidelines/guidelines.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
// import { NotificationModule } from './notification/notification.module';
import { VoucherModule } from './voucher/voucher.module';
import { PasswordResetEntity } from './passwordReset/passwordReset.entity';
import { PasswordResetModule } from './passwordReset/passwordReset.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL ? process.env.DATABASE_URL : '',
      type: 'postgres',
      host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : '',
      port: process.env.POSTGRES_PORT
        ? parseInt(<string>process.env.POSTGRES_PORT)
        : null,
      username: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : '',
      password: process.env.POSTGRES_PASSWORD
        ? process.env.POSTGRES_PASSWORD
        : '',
      database: process.env.POSTGRES_DATABASE
        ? process.env.POSTGRES_DATABASE
        : '',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities:[
        PasswordResetEntity
      ]
    }),
    AuthModule,
    UsersModule,
    ConsultingModule,
    PatientModule,
    PrescriptionModule,
    DrugsModule,
    PointsModule,
    LookupModule,
    RolesModule,
    GuidelinesModule,
    PharmacyModule,
    VoucherModule,
    PasswordResetModule,
    MailModule
  ],
})
export class AppModule {}
