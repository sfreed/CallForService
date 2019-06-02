import { BaseModel } from '../BaseModel';

export class MasterUser extends BaseModel {
  id: string;
  personId: string;
  userName: string;
  password: string;
  namePrefixId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  NameSuffixId: number;
  sortName: string;
  fullName: string;
  userGroupId: number;
  effectiveDateTime: string;
}
