import { BaseModel } from '../../BaseModel';

export class VehicleType extends BaseModel {
  id: number;
  vehicleTypeCode: string;
  vehicleTypeCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
