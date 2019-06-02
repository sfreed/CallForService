import { BaseModel } from '../../BaseModel';

export class NamePrefix extends BaseModel {
  id: number;
  namePrefix: string;
  namePrefixDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
