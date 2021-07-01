import { Role } from './role.interface';

export interface User {
  id: number;
  username: string;
  password?: string;
  active?: string;
  roleId?: number;
  role?: Role;
}
