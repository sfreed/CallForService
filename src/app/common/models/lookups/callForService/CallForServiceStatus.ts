import { BaseModel } from '../../BaseModel';

export class CallForServiceStatus extends BaseModel {
  id: number;
  callForServiceStatusDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
