import { BaseModel } from '../BaseModel';

export class CallForServiceHospital extends BaseModel {
  id: number;
  hospitalName: boolean;
  isActive: boolean;
  isUserEditable: boolean;
}
