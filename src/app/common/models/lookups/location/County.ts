import { BaseModel } from '../../BaseModel';

export class County extends BaseModel {
  id: number;
  countyCode: string;
  countyName: string;
  stateCodeId: number;
  isActive: boolean;
  isUserEditable: boolean;
}
