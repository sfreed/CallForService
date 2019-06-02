import { BaseModel } from '../BaseModel';

export class Agency extends BaseModel {
  id: number;
  agencyCode: string;
  agencyName: string;
  agencyTypeCodeId: number;
  ncicCode: string;
  conversionNumber: string;
  isActive: boolean;
  isUserEditable: boolean;
}
