import { InvolvedPerson } from './person/InvolvedPerson';
import { BaseModel } from '../BaseModel';
import { Location } from '../call/Location';

export class InvolvedPersonItem extends BaseModel {
  callForServiceId: number;
  personId: string;
  involvedPerson: InvolvedPerson;
  contactTypeId: number;
  remarks: string;
  isAmbulanceRequired: boolean;
  callForServiceHospitalId: number;
  ambulanceRemarks: string;
}
