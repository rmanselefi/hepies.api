import { Dx } from 'src/prescription/models/diagnosis.interface';
import { Hx } from 'src/prescription/models/hx.interface';
import { Px } from 'src/prescription/models/px.interface';
import { Investigation } from '../prescription/models/investigation.interface';

export interface Patient {
  id: number;
  name: string;
  fathername: string;
  grandfathername: string;
  phone: string;
  age: string;
  sex: string;
  weight: string;
  ix?: Investigation;
  hx?: Hx;
  px?: Px;
  dx?: Dx;
}
