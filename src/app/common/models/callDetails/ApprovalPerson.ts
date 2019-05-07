import { BaseModel } from '../common/BaseModel';

export class ApprovalPerson extends BaseModel {
  officerId: string;
  id: string;
  namePrefixId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  NameSuffixId: number;
  sortName: string;
  fullName: string;
  badgeId: string;
  badgePrefix: string;
  badgeNumber: string;
  badgeSuffix: string;
  officerRankId: number;
  agencyId: number;
  pBLENumber: string;
  hireDate: string;
  leaveDate: string;
  remarks: string;
}
