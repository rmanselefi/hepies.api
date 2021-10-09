import { User } from '../auth/user.interface';
import { Consult } from './consult.interface';

export interface Comment {
  id: number;
  comment: string;
  author: string;
  user: User;
  consult: Consult;
}
