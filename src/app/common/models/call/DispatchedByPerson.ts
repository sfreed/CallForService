import { BaseModel } from '../common/BaseModel';

export class DispatchedByPerson extends BaseModel {
  id: string;
  userName: string;
  namePrefixCodeId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  lastNameSuffixCodeId: number;
  sortName: string;
  fullName: string;

  personId: string;
  password: string;
  namePrefixId: number;
  NameSuffixId: number;
  userGroupId: number;
}
