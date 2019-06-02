import { BaseModel } from '../../BaseModel';

export class EyeColor extends BaseModel {
  id: number;
  eyeColorCode: string;
  eyeColorCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
