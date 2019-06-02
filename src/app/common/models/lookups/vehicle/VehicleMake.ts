import { BaseModel } from '../../BaseModel';

export class VehicleMake extends BaseModel {
  id: number;
  vehicleMakeCode: string;
  vehicleMakeCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
