import { BaseModel } from '../../BaseModel';

export class CallForServiceType extends BaseModel {
  id: number;
  code: string;
  description: string;
  priorityOrder: number;
  alertTimerActive: boolean;
  alertTimerInterval: number;
  isActive: boolean;
  isUserEditable: boolean;
}
