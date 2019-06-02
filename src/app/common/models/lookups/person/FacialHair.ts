import { BaseModel } from '../../BaseModel';

export class FacialHair extends BaseModel {
  id: number;
  facialHairCode: string;
  facialHairCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
