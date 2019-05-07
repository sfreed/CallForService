import { OwnerPerson } from './OwnerPerson';
import { TagInformation } from './TagInformation';
import { BaseModel } from './BaseModel';
import { Person } from './person/Person';

export class Vehicle extends BaseModel {
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
  ownerPerson: OwnerPerson;
  tagInformation: TagInformation;
}
