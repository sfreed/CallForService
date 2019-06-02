import { BaseModel } from '../../BaseModel';

export class HairColor extends BaseModel {
  id: number;
  hairColorCode: string;
  hairColorCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
