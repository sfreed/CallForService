import { BaseModel } from '../../BaseModel';

export class VehicleTransmissionType extends BaseModel {
  id: number;
  VehicleTransmissionTypeCode: string;
  VehicleTransmissionTypeCodeDescription: string;
  isActive: boolean;
  isUserEditable: boolean;
}
