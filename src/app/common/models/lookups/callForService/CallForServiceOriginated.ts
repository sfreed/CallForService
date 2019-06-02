import { BaseModel } from '../../BaseModel';

export class CallForServiceOriginated extends BaseModel {
  id: number;
  originatedFrom: string;
  isActive: boolean;
  isUserEditable: boolean;
}
