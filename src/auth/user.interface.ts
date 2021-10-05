import { Proffesional } from 'src/users/professional.interface';
import { Role } from './role.interface';

export interface User {
  id: number;
  username: string;
  password?: string;
  active?: string;
  isFit?: string;
  roleId?: number;
  token?: string;
  profession?: Proffesional;
  role?: Role;
}
