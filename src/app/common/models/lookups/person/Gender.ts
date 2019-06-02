import { BaseModel } from '../../BaseModel';

export class Gender extends BaseModel {
  id: number;
  gender: string;
  genderDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
