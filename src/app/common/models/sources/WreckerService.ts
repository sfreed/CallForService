import { BaseModel } from '../common/BaseModel';

export class WreckerService extends BaseModel {
  id: number;
  wreckerServiceName: string;
  contact: string;
  phoneNumber: string;
  onCallPhoneNo: string;
  rotationSequence: number;
  towingFee: number;
  wreckerRotationType: number;
  isUserEditable: boolean;
}
