
import { PersonAddress } from '../person/PersonAddress';
import { Person } from '../person/Person';

export class InvolvedPerson {
  id: number;
  callForServiceId: number;
  involvedPerson: Person;
  contactTypeId: number;
  personAddress: PersonAddress;
  remarks: string;
  isAmbulanceRequired: boolean;
  callForServiceHospitalId: number;
  ambulanceRemarks: string;
}
