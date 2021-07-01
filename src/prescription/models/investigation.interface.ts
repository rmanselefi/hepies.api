import { Chemistry } from "./chemistry.interface";
import { Endocrinology } from "./endocrinology.interface";
import { Hemathology } from "./hemathology.interface";
import { Serology } from "./serology.interface";
import { Urine } from "./urine.interface";

export interface Investigation {
  id: number;
  microbiology: string;
  pathologyindex: string;
  radiologyindex: string;
  others: string;
  hemathology: Hemathology;
  chemistry: Chemistry;
  serology: Serology;
  endocrinology: Endocrinology;
  urine: Urine;
}
