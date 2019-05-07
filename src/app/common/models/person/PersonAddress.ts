import { BaseModel } from '../common/BaseModel';

export class PersonAddress extends BaseModel {
  id: string;
  name: string;
  addressTypeId: number;
  streetNumber: string;
  streetNumberSuffix: string;
  streetId: string;
  countyId: number;
  cityId: number;
  zoneId: number;
  patrolAreaId: number;
  latitude: number;
  longitude: number;
  effectiveDateTime: string;
  createdUserId: string;
}
