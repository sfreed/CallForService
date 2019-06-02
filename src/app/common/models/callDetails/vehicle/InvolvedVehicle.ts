import { TagInformation } from './TagInformation';
import { BaseModel } from '../../BaseModel';
import { InvolvedPerson } from '../person/InvolvedPerson';

export class InvolvedVehicle extends BaseModel {
  id: string;
  year: number;
  model: string;
  VIN: string;
  color: number;
  type: number;
  style: number;
  numberOfWheels: number;
  numberOfAxles: number;
  numberOfCylinders: number;
  engineType: number;
  tranmissionType: number;
  odometerMileage: number;
  fuelType: number;
  ownerPerson: InvolvedPerson;
  tagInformation: TagInformation;
}
