import { BaseModel } from '../../BaseModel';

export class Zone extends BaseModel {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdUserId: any;
  effectiveDateTime: string;
}
