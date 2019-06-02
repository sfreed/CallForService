import { BaseModel } from '../../BaseModel';

export class NameSuffix extends BaseModel {
  id: number;
  nameSuffix: string;
  nameSuffixDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
