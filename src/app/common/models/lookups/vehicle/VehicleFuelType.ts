import { BaseModel } from '../../BaseModel';

export class VehicleFuelType extends BaseModel {
  id: number;
  vehicleFuelTypeCode: string;
  vehicleFuelTypeCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
