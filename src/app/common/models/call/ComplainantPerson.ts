import { BaseModel } from '../common/BaseModel';

export class ComplainantPerson extends BaseModel {
  id: string;
  namePrefixCodeId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  lastNameSuffixCodeId: number;
  fullName: string;
  homePhoneNumber: string;
  workPhoneNumber: string;
  mobilePhoneNumber: string;
  nameSuffixCodeId: number;
  sortName: string;
}
