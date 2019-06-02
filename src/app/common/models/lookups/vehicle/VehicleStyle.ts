import { BaseModel } from '../../BaseModel';

export class VehicleStyle extends BaseModel {
  id: number;
  vehicleStyleCode: string;
  vehicleStyleCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
