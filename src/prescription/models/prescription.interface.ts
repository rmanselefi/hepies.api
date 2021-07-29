import { Drug } from '../../drugs/drug.interface';
import { Patient } from '../../patient/patient.interface';

export interface Prescription {
  id: number;
  dose: string;
  route: string;
  takein: string;
  frequency: string;
  remark: string;
  ampule: string;
  strength: string;
  unit: string;
  material_name: string;
  size: string;
  type: string;
  patient: Patient;
  drug: Drug;
}
