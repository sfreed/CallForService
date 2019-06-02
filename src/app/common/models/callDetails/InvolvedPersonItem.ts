import { InvolvedPerson } from './person/InvolvedPerson';
import { BaseModel } from '../BaseModel';
import { PersonAddress } from './person/PersonAddress';

export class InvolvedPersonItem extends BaseModel {
  id: number;
  callForServiceId: number;
  personId: string;
  involvedPerson: InvolvedPerson;
  contactTypeId: number;
  personAddress: PersonAddress;
  remarks: string;
  isAmbulanceRequired: boolean;
  callForServiceHospitalId: number;
  ambulanceRemarks: string;
}
