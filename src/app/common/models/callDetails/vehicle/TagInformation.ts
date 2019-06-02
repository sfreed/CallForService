import { BaseModel } from '../../BaseModel';

export class TagInformation extends BaseModel {
  id: string;
  vehicleId: string;
  tagNumber: string;
  tagState: number;
  tagExpiresYear: number;
}
