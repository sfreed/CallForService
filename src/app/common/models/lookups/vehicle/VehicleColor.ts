import { BaseModel } from '../../BaseModel';

export class VehicleColor extends BaseModel {
  id: number;
  vehicleColorCode: string;
  vehicleColorCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
