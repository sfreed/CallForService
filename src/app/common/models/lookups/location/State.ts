import { BaseModel } from '../../BaseModel';

export class State extends BaseModel {
  id: number;
  stateCode: string;
  stateName: string;
  isActive: boolean;
  isUserEditable: boolean;
  createdUserId: any;
  effectiveDateTime: string;
}
