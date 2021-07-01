import { Prescription } from './prescription.interface';

export interface Px {
  id: number;
  ga: string;
  pr: string;
  rr: string;
  bp: string;
  temp: string;
  heent: string;
  lgs: string;
  rs: string;
  cvs: string;
  abd: string;
  prescription: Prescription;
}
