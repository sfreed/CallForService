import { BaseModel } from '../../BaseModel';

export class StreetNameDirection extends BaseModel {
  id: number;
  streetNameDirectionalCode: string;
  streetNameDirectionalCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
