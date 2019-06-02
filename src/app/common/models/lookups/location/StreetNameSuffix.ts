import { BaseModel } from '../../BaseModel';

export class StreetNameSuffix extends BaseModel {
  id: number;
  streetNameSuffix: string;
  streetNameSuffixDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
