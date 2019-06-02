import { BaseModel } from '../../BaseModel';

export class ContactType extends BaseModel {
  id: number;
  contactTypeCode: string;
  contactTypeCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
