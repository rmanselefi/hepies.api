import { Drug } from '../../drugs/drug.interface';
import { Patient } from '../../patient/patient.interface';

export interface Prescription {
  id: number;
  dose: string;
  route: string;
  takein: string;
  frequency: string;
  patient: Patient;
  drug: Drug;
}
