import { BaseModel } from '../../BaseModel';

export class City extends BaseModel {
  id: number;
  cityName: string;
  stateCodeId: number;
  zipCode: string;
  isActive: boolean;
  stateCode: string;
  createdUserId: any;
  effectiveDateTime: string;
}
