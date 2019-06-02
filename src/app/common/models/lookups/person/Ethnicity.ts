import { BaseModel } from '../../BaseModel';

export class Ethnicity extends BaseModel {
  id: number;
  ethnicityCode: string;
  ethnicityCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
