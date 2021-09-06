/* eslint-disable prettier/prettier */
import { Drug } from '../drugs/drug.interface';
import { Proffesional } from '../users/professional.interface';

export interface Pharmacy {
  id: number;
  drug_name: string;
  price: string;
  drug: Drug;
  professional: Proffesional;
}
