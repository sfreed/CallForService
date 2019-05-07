import { BaseModel } from '../BaseModel';

export class CallRemarksItem extends BaseModel {
  id: number;
  callForServiceId: number;
  remarks: string;
}
