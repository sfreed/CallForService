
import { InvolvedVehicle } from './vehicle/InvolvedVehicle';
import { BaseModel } from '../BaseModel';
import { WreckerService } from './vehicle/WreckerService';
import { InvolvedPerson } from './person/InvolvedPerson';

export class InvolvedVehiclesItem extends BaseModel {
  callForServiceId: number;
  vehicleId: string;
  vehicle: InvolvedVehicle;
  vehicleGCICResults: string;
  vehicleRemarks: string;
  vehicleDriverPersonId: string;
  vehicleDriverPerson: InvolvedPerson;
  isWrecker: boolean;
  wreckerServerId: number;
  wreckerServer: WreckerService;
  wreckerTowedTo: string;
  wreckerTowedDateTime: string;
  wreckerRemarks: string;
  wreckerSelectTyped: number;
  wreckerTimeCalled: string;
  wreckerTimeArrived: string;
  isDriverSameAsOwner: boolean;
}
