import { BaseModel } from '../../BaseModel';

export class AddressType extends BaseModel {
  id: number;
  code: string;
  description: string;
  isActive: boolean;
  isUserEditable: boolean;
}
