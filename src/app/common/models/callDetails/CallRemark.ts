import { BaseModel } from '../common/BaseModel';

export class CallRemarksItem extends BaseModel {
  id: number;
  callForServiceId: number;
  remarks: string;
}
