/* eslint-disable prettier/prettier */
import { User } from '../auth/user.interface';

export interface PasswordReset {
  id?: number;
  email?: string;
  verification_code?: number;
  expires_in?: number;
}
