import { BaseModel } from '../BaseModel';

export class AvailableUnit extends BaseModel {
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
  currentCall: number;
}
