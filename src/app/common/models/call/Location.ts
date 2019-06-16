import { BaseModel } from '../BaseModel';

export class Location extends BaseModel {
  id: string;
  name: string;
  addressTypeId: number;
  streetNumber: string;
  streetNumberSuffix: string;
  streetId: string;
  countyId: number;
  cityId: number;
  zipId: number;
  zoneId: number;
  patrolAreaId: number;
  latitude: number;
  longitude: number;
}
