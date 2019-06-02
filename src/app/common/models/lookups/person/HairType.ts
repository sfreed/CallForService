import { BaseModel } from '../../BaseModel';

export class HairType extends BaseModel  {
  id: number;
  hairTypeCode: string;
  hairTypeCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
