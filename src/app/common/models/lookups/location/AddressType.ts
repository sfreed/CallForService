import { BaseModel } from '../../BaseModel';

export class AddressType extends BaseModel {
  id: number;
  addressTypeCode: string;
  addressTypeName: string;
  isActive: boolean;
  isUserEditable: boolean;
}
