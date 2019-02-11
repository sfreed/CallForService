import { OfficerPerson } from './OfficerPerson';

export class CallForServiceUnit {
  id: number;
  unitDescription: string;
  officerPerson: OfficerPerson;
  unitType: number;
  unitAgencyId: number;
  active?: boolean;
}
