import { BaseModel } from '../BaseModel';

export class AgencyType extends BaseModel {
  id: number;
  agencyTypeCode: string;
  agencyTypeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
