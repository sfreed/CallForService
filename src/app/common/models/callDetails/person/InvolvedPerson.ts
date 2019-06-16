import { BaseModel } from '../../BaseModel';
import { Location } from '../../call/Location';

export class InvolvedPerson extends BaseModel {
  id: string;
  namePrefixCodeId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  lastNameSuffixCodeId: number;
  sortName: string;
  fullName: string;
  location: Location;
  socialSecurityNumber: string;
  driversLicenseNumber: string;
  driversLicenseState: string;
  driversLicenseClass: string;
  driversLicenseExpirationDate: string;
  driversLicenseIssueDate: string;
  homePhoneNumber: string;
  workPhoneNumber: string;
  mobilePhoneNumber: string;
  dateOfBirth: string;
  isDeceased: boolean;
  dateOfDeath: string;
  age: number;
  ageEnd: number;
  genderId: number;
  raceId: number;
  ethnicityId: number;
  height: string;
  weight: string;
  hairColorId: number;
  hairTypeId: number;
  eyeColorId: number;
  eyewearId: number;
  facialHairId: number;
}
