import { OfficerPerson } from './OfficerPerson';

export class CallForServiceUnit {
  id: number;
  unitDescription: string;
  unitType: number;
  unitAgencyId: number;
  unitActiveId: number;
  patrolArea: number;
  dateTimeIn: string;
  dateTimeOut: string;
  startMiles: number;
  endMiles: number;
  modifiedDateTime: string;
  status: number;
  gPSLogTime: string;
  latitude: number;
  longitude: number;
  speed: number;
  effectiveDateTime: string;
  createdUserId: string;
}
