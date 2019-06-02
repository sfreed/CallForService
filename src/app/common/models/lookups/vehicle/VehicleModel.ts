import { BaseModel } from '../../BaseModel';

export class VehicleModel extends BaseModel {
  id: string;
  vehicleMakeId: string;
  makeCode: string;
  makeCodeDescription: string;
  vehicleModelName: string;
  vehicleModelDescription: string;
}
