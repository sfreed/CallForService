import { VehicleDriverPerson } from './VehicleDriverPerson';
import { WreckerService } from '../sources/WreckerService';
import { OwnerPerson } from './OwnerPerson';
import { Vehicle } from './Vehicle';

export class InvolvedVehicle {
  id: number;
  callForServiceId: number;
  vehicle: Vehicle;
  wreckerServer: WreckerService;
  wreckerTowedTo: string;
  wreckerTowedDateTime: string;
  wreckerRemarks: string;
  wreckerSelectTyped: number;
  wreckerTimeCalled: string;
  wreckerTimeArrived: string;
  isSameAsDriver: boolean;
  ownerPerson: OwnerPerson;
}
