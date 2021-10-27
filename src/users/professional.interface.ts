/* eslint-disable prettier/prettier */
import { User } from '../auth/user.interface';

export interface Proffesional {
  id?: number;
  name?: string;
  fathername?: string;
  grandfathername?: string;
  phone?: string;
  proffesion?: string;
  points?: string;
  license?: string;
  email?: string;
  profile?: string;
  speciality?: string;
  workplace?: string;
  sex?: string;
  interests?: string;
  dob?: string;
  user?: User;
}
