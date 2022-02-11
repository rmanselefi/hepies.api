/* eslint-disable prettier/prettier */
import { User } from '../auth/user.interface';

export interface Consult {
  id?: number;
  topic?: string;
  image?: string;
  createdAt?: Date;
  user?: string;
  author?: User;
}
