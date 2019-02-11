import { OwnerPerson } from './OwnerPerson';
import { TagInformation } from './TagInformation';

export class Vehicle {
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
  engineSize: number;
  tranmissionType: number;
  odometerMileage: number;
  fuelType: number;
  ownerPerson: OwnerPerson;
  tagInformation: TagInformation;
}
