import { Drug } from '../../drugs/drug.interface';
import { Patient } from '../../patient/patient.interface';
import { Hx } from './hx.interface';
import { Investigation } from './investigation.interface';
import { Px } from './px.interface';

export interface Prescription {
  id: number;
  dose: string;
  route: string;
  takein: string;
  frequency: string;
  patient: Patient;
  drug: Drug;  
}
