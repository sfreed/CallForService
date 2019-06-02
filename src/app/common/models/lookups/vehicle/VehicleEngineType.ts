import { BaseModel } from '../../BaseModel';

export class VehicleEngineType extends BaseModel {
  id: number;
  VehicleEngineTypeCode: string;
  VehicleEngineTypeCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
