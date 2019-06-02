import { BaseModel } from '../../BaseModel';

export class Street extends BaseModel {
  id: string;
  streetNamePreModifier: string;
  streetNamePreDirectionId: string;
  streetNamePreDirectionCode: string;
  streetNamePreDirectionDescription: string;
  streetName: string;
  streetNameSuffixId: string;
  streetNameSuffixCode: string;
  streetNameSuffixDescription: string;
  streetNamePostDirectionId: string;
  streetNamePostDirectionCode: string;
  streetNamePostDirectionDescription: string;
  streetNamePostModifier: string;
  isUserEditable: boolean;
  isActive: boolean;
  effectiveDateTime: string;
  createdUserId: string;
}
