import { BaseModel } from '../../BaseModel';

export class Eyewear extends BaseModel {
  id: number;
  eyewearCode: string;
  eyewearCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
