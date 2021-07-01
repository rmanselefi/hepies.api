import { Prescription } from './prescription.interface';

export interface Hx {
  id: number;
  cc: string;
  hpi: string;
  prescription: Prescription;
}
