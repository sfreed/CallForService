import { VehicleDriverPerson } from '../vehicle/VehicleDriverPerson';
import { WreckerService } from '../sources/WreckerService';
import { Vehicle } from '../vehicle/Vehicle';
import { BaseModel } from '../common/BaseModel';

export class InvolvedVehiclesItem extends BaseModel {
  id: number;
  callForServiceId: number;
  vehicleId: string;
  vehicle: Vehicle;
  vehicleGCICResults: string;
  vehicleRemarks: string;
  vehicleDriverPersonId: string;
  vehicleDriverPerson: VehicleDriverPerson;
  isWrecker: boolean;
  wreckerServerId: number;
  wreckerServer: WreckerService;
  wreckerTowedTo: string;
  wreckerTowedDateTime: string;
  wreckerRemarks: string;
  wreckerSelectTyped: number;
  wreckerTimeCalled: string;
  wreckerTimeArrived: string;
  isSameAsDriver: boolean;
  ownerPersonId: string;
}
